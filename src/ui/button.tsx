import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'amber' | 'ink' | 'plain'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
  square?: boolean
}

export function Button({
  children,
  className = '',
  square = false,
  type = 'button',
  variant = 'amber',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`ui-button ui-button--${variant}${square ? ' ui-button--square' : ''} ${className}`.trim()}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
