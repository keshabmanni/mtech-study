import type { InputHTMLAttributes, ReactNode } from 'react'

type ChecklistItemProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> & {
  children: ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function ChecklistItem({
  children,
  className = '',
  defaultChecked,
  checked,
  onCheckedChange,
  ...props
}: ChecklistItemProps) {
  const isControlled = checked !== undefined

  return (
    <label className={`ui-check-item ${className}`.trim()}>
      <input
        {...props}
        defaultChecked={isControlled ? undefined : defaultChecked}
        checked={checked}
        className="ui-check-item__input"
        onChange={
          onCheckedChange
            ? (event) => onCheckedChange(event.currentTarget.checked)
            : undefined
        }
        readOnly={isControlled && !onCheckedChange}
        type="checkbox"
      />
      <span>{children}</span>
    </label>
  )
}
