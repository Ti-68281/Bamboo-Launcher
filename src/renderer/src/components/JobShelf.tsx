import { Boxes, Coffee, DownloadCloud, PackageOpen, Puzzle, Sparkles, Sprout } from 'lucide-react'
import type { JobKind } from '@shared/types'
import { useBamboo } from '../store'
import { ProgressBar } from './ui'

const JOB_ICONS: Record<JobKind, typeof DownloadCloud> = {
  game: Sprout,
  loader: Boxes,
  mod: Puzzle,
  modpack: PackageOpen,
  java: Coffee,
  skin: Sparkles,
  microsoft: Sparkles,
  other: DownloadCloud,
}

export function JobShelf() {
  const jobs = useBamboo((s) => s.jobs)
  const jobOrder = useBamboo((s) => s.jobOrder)
  const running = jobOrder
    .map((id) => jobs[id])
    .filter(
      (job) =>
        job &&
        job.status === 'running' &&
        !(job.kind === 'game' && job.title.startsWith('启动')),
    )
  if (!running.length) return null
  return (
    <div className="job-shelf">
      <div className="job-shelf-header">
        <span className="job-shelf-title">
          <span className="job-pulse" />
          任务
        </span>
        <span className="job-shelf-count">{running.length} 项</span>
      </div>
      {running.slice(0, 3).map((job) => {
        const Icon = JOB_ICONS[job.kind] ?? DownloadCloud
        return (
          <div className="job-item" key={job.id}>
            <div className="job-icon">
              <Icon size={16} />
            </div>
            <div className="job-main">
              <div className="job-line">
                <span className="job-title">{job.title}</span>
                <span className="job-percent">
                  {job.indeterminate ? '···' : `${Math.round(job.progress)}%`}
                </span>
              </div>
              <div className="job-detail">{job.detail}</div>
              <ProgressBar value={job.progress} indeterminate={job.indeterminate} />
            </div>
          </div>
        )
      })}
      {running.length > 3 && <div className="job-more">还有 {running.length - 3} 个任务在队列中</div>}
    </div>
  )
}
