import type { JobKind, JobProgress } from '../shared/types'
import { appEvents } from './events'
import { errorMessage } from './utils'

export interface JobContext {
  id: string
  report(progress: number, detail: string, options?: { indeterminate?: boolean }): void
  setMeta(meta: Record<string, unknown>): void
}

type Runner = (context: JobContext) => Promise<Record<string, unknown> | void>

export class JobManager {
  private jobs = new Map<string, JobProgress>()
  private lastEmit = new Map<string, number>()

  start(kind: JobKind, title: string, runner: Runner): JobProgress {
    const job: JobProgress = {
      id: `job_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      kind,
      title,
      detail: '准备中…',
      progress: 0,
      indeterminate: true,
      status: 'running',
      startedAt: Date.now(),
    }
    this.jobs.set(job.id, job)
    this.emit(job, true)
    const context: JobContext = {
      id: job.id,
      report: (progress, detail, options) => {
        if (job.status !== 'running') return
        job.progress = Math.max(0, Math.min(100, Math.round(progress * 10) / 10))
        job.detail = detail
        job.indeterminate = options?.indeterminate ?? false
        this.emit(job)
      },
      setMeta: (meta) => {
        job.meta = { ...(job.meta ?? {}), ...meta }
        this.emit(job)
      },
    }
    void (async () => {
      try {
        const meta = await runner(context)
        job.status = 'success'
        job.progress = 100
        job.indeterminate = false
        job.detail = job.detail || '完成'
        job.finishedAt = Date.now()
        if (meta) job.meta = { ...(job.meta ?? {}), ...meta }
        this.emit(job, true)
      } catch (error) {
        console.error(`[job] ${title}`, error)
        job.status = 'error'
        job.indeterminate = false
        job.error = errorMessage(error)
        job.detail = '任务失败'
        job.finishedAt = Date.now()
        this.emit(job, true)
        appEvents.emitBamboo({
          type: 'toast',
          payload: {
            kind: 'error',
            title: `${title}失败`,
            message: errorMessage(error),
          },
        })
      }
    })()
    return structuredClone(job)
  }

  list(): JobProgress[] {
    return Array.from(this.jobs.values())
      .filter((j) => j.status === 'running')
      .map((j) => structuredClone(j))
  }

  private emit(job: JobProgress, force = false): void {
    const now = Date.now()
    const last = this.lastEmit.get(job.id) ?? 0
    // Minecraft installs can produce hundreds of progress callbacks per second.
    // Throttle IPC so the renderer stays responsive and never gets flooded.
    if (!force && now - last < 120) return
    this.lastEmit.set(job.id, now)
    appEvents.emitBamboo({ type: 'job', payload: structuredClone(job) })
  }
}
