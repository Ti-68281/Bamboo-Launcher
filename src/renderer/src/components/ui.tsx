import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 640,
  className = '',
  closable = true,
}: {
  open: boolean
  onClose: () => void
  title?: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  footer?: ReactNode
  width?: number
  className?: string
  closable?: boolean
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closable) onClose()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, onClose, closable])

  if (!open) return null
  return createPortal(
    <div
      className="modal-layer"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && closable) onClose()
      }}
    >
      <div className={`modal glass-card ${className}`} style={{ width }} role="dialog" aria-modal="true">
        <div className="modal-top-glow" />
        {(title || closable) && (
          <header className="modal-header">
            <div>
              {title && <h2>{title}</h2>}
              {subtitle && <p>{subtitle}</p>}
            </div>
            {closable && (
              <button type="button" className="icon-button" onClick={onClose} aria-label="关闭">
                <X size={18} />
              </button>
            )}
          </header>
        )}
        <div className="modal-body">{children}</div>
        {footer && <footer className="modal-footer">{footer}</footer>}
      </div>
    </div>,
    document.body,
  )
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
  actions,
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
  actions?: ReactNode
}) {
  return (
    <div className="page-header">
      <div className="page-header-copy">
        {eyebrow && (
          <div className="eyebrow">
            <span className="eyebrow-line" />
            {eyebrow}
          </div>
        )}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {(actions || children) && <div className="page-actions">{actions ?? children}</div>}
    </div>
  )
}

export function Toggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  disabled?: boolean
  label?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      className={`toggle ${checked ? 'on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span />
    </button>
  )
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  size = 'normal',
}: {
  value: T
  options: Array<{ value: T; label: ReactNode; icon?: ReactNode; disabled?: boolean }>
  onChange: (value: T) => void
  size?: 'normal' | 'small'
}) {
  return (
    <div className={`segmented ${size}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${value === option.value ? 'active' : ''}`}
          disabled={option.disabled}
          onClick={() => onChange(option.value)}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function Spinner({ size = 18 }: { size?: number }) {
  return <span className="spinner" style={{ width: size, height: size }} />
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  compact,
}: {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  compact?: boolean
}) {
  return (
    <div className={`empty-state ${compact ? 'compact' : ''}`}>
      {icon && <div className="empty-icon">{icon}</div>}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action && <div className="empty-action">{action}</div>}
    </div>
  )
}

export function ProgressBar({
  value,
  indeterminate,
  tone = 'bamboo',
}: {
  value: number
  indeterminate?: boolean
  tone?: 'bamboo' | 'warm' | 'danger'
}) {
  return (
    <div className={`progress-track ${indeterminate ? 'indeterminate' : ''} tone-${tone}`}>
      <span
        className="progress-fill"
        style={indeterminate ? undefined : { width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  )
}

export function InlineNotice({
  tone = 'info',
  icon,
  title,
  children,
  action,
}: {
  tone?: 'info' | 'warning' | 'danger' | 'success' | 'neutral'
  icon?: ReactNode
  title?: ReactNode
  children?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className={`inline-notice tone-${tone}`}>
      {icon && <div className="inline-notice-icon">{icon}</div>}
      <div className="inline-notice-copy">
        {title && <strong>{title}</strong>}
        {children && <div>{children}</div>}
      </div>
      {action && <div className="inline-notice-action">{action}</div>}
    </div>
  )
}

export function Badge({
  children,
  tone = 'neutral',
  className = '',
}: {
  children: ReactNode
  tone?: 'neutral' | 'green' | 'amber' | 'red' | 'blue' | 'violet'
  className?: string
}) {
  return <span className={`badge tone-${tone} ${className}`}>{children}</span>
}

export function useDebouncedValue<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}
