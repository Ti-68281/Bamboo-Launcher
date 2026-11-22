import type { StatsOverview } from '../../shared/types'
import type { AppStore } from '../store'

export class StatsService {
  constructor(private store: AppStore) {}

  get(days = 7): StatsOverview {
    const now = Date.now()
    const sessions = this.store.state.sessions
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    const todayStart = startOfToday.getTime()
    const weekStart = todayStart - 6 * 24 * 60 * 60 * 1000
    const todayPlayTimeMs = sessions
      .filter((s) => s.startedAt >= todayStart)
      .reduce((sum, s) => sum + s.durationMs, 0)
    const weekPlayTimeMs = sessions
      .filter((s) => s.startedAt >= weekStart)
      .reduce((sum, s) => sum + s.durationMs, 0)
    const daily: Array<{ date: string; durationMs: number }> = []
    for (let i = days - 1; i >= 0; i--) {
      const day = new Date(todayStart - i * 86400000)
      const end = day.getTime() + 86400000
      const durationMs = sessions
        .filter((s) => s.startedAt >= day.getTime() && s.startedAt < end)
        .reduce((sum, s) => sum + s.durationMs, 0)
      daily.push({ date: dateKey(day), durationMs })
    }
    const byInstanceMap = new Map<
      string,
      { instanceId: string; name: string; playTimeMs: number; launches: number; lastPlayedAt?: number }
    >()
    for (const instance of this.store.state.instances) {
      byInstanceMap.set(instance.id, {
        instanceId: instance.id,
        name: instance.name,
        playTimeMs: instance.playTimeMs ?? 0,
        launches: sessions.filter((s) => s.instanceId === instance.id).length,
        lastPlayedAt: instance.lastPlayedAt,
      })
    }
    for (const session of sessions) {
      if (!byInstanceMap.has(session.instanceId)) {
        byInstanceMap.set(session.instanceId, {
          instanceId: session.instanceId,
          name: session.instanceName,
          playTimeMs: session.durationMs,
          launches: 1,
          lastPlayedAt: session.endedAt,
        })
      } else {
        const existing = byInstanceMap.get(session.instanceId)!
        existing.launches = Math.max(existing.launches, 1)
      }
    }
    return {
      totalPlayTimeMs: this.store.state.instances.reduce((sum, i) => sum + (i.playTimeMs ?? 0), 0),
      todayPlayTimeMs,
      weekPlayTimeMs,
      sessions: [...sessions].sort((a, b) => b.startedAt - a.startedAt).slice(0, 100),
      byInstance: Array.from(byInstanceMap.values()).sort((a, b) => b.playTimeMs - a.playTimeMs),
      daily,
    }
  }
}

function dateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
