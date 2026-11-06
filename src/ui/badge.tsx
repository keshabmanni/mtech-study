import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant = 'paper' | 'amber' | 'ink'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode
  label?: ReactNode
  value?: ReactNode
  variant?: BadgeVariant
}

export function Badge({
  children,
  className = '',
  label,
  value,
  variant = 'paper',
  ...props
}: BadgeProps) {
  const badgeValue = value ?? children
  const isLabeled = label !== undefined

  return (
    <span
      className={`ui-badge ui-badge--${variant}${isLabeled ? ' ui-badge--labeled' : ''} ${className}`.trim()}
      {...props}
    >
      {isLabeled ? (
        <>
          <span className="ui-badge__label">{label}</span>
          <span className="ui-badge__value">{badgeValue}</span>
        </>
      ) : (
        badgeValue
      )}
    </span>
  )
}
