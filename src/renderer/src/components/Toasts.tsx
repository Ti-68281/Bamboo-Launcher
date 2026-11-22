import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { useBamboo } from '../store'

export function Toasts() {
  const toasts = useBamboo((s) => s.toasts)
  const dismiss = useBamboo((s) => s.dismissToast)
  const setPage = useBamboo((s) => s.setPage)

  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => {
        const Icon =
          toast.kind === 'success'
            ? CheckCircle2
            : toast.kind === 'error'
              ? XCircle
              : toast.kind === 'warning'
                ? AlertTriangle
                : Info
        return (
          <div className={`toast toast-${toast.kind}`} key={toast.id}>
            <div className="toast-icon">
              <Icon size={18} />
            </div>
            <div className="toast-copy">
              <strong>{toast.title}</strong>
              {toast.message && <p>{toast.message}</p>}
              {toast.actionPage && (
                <button
                  type="button"
                  className="toast-action"
                  onClick={() => {
                    setPage(toast.actionPage!)
                    dismiss(toast.id)
                  }}
                >
                  去看看
                </button>
              )}
            </div>
            <button
              type="button"
              className="toast-close"
              aria-label="关闭通知"
              onClick={() => dismiss(toast.id)}
            >
              <X size={14} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
