import type { HTMLAttributes, ReactNode } from 'react'

export type PanelSurface = 'paper' | 'canvas' | 'muted'

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  surface?: PanelSurface
  raised?: boolean
}

export function Panel({
  children,
  className = '',
  raised = false,
  surface = 'paper',
  ...props
}: PanelProps) {
  return (
    <div
      className={`ui-panel ui-panel--${surface}${raised ? ' ui-panel--raised' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  )
}
