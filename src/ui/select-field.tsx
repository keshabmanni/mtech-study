import {
  Children,
  isValidElement,
  useId,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

type SelectOptionProps = {
  children?: ReactNode
  disabled?: boolean
  value?: string
}

type SelectFieldProps = {
  'aria-label'?: string
  children: ReactNode
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  onChange: (value: string) => void
  placeholder?: string
  value: string
}

export function SelectField({
  'aria-label': ariaLabel,
  children,
  className = '',
  disabled = false,
  id,
  label,
  onChange,
  placeholder = 'Select an option',
  value,
}: SelectFieldProps) {
  const generatedId = useId()
  const controlId = id ?? generatedId
  const listboxId = `${controlId}-options`
  const options = Children.toArray(children).flatMap((child) => {
    if (!isValidElement<SelectOptionProps>(child) || child.type !== 'option') {
      return []
    }

    return [{
      content: child.props.children,
      disabled: child.props.disabled ?? false,
      value: child.props.value ?? '',
    }]
  })
  const selectedIndex = options.findIndex((option) => option.value === value)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(selectedIndex)
  const selectedOption = options[selectedIndex]

  function chooseOption(index: number) {
    const option = options[index]
    if (!option || option.disabled) return

    onChange(option.value)
    setIsOpen(false)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!isOpen) {
        setActiveIndex(selectedIndex)
        setIsOpen(true)
        return
      }

      const direction = event.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((current) => {
        let next = current
        do {
          next = (next + direction + options.length) % options.length
        } while (options[next]?.disabled && next !== current)
        return next
      })
      return
    }

    if (event.key === 'Escape' && isOpen) {
      event.preventDefault()
      setIsOpen(false)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (isOpen) {
        chooseOption(activeIndex)
      } else {
        setActiveIndex(selectedIndex)
        setIsOpen(true)
      }
    }
  }

  return (
    <div className="ui-select-field">
      {label && (
        <label className="ui-select-field__label" htmlFor={controlId}>
          {label}
        </label>
      )}
      <button
        aria-activedescendant={isOpen ? `${listboxId}-${activeIndex}` : undefined}
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        className={`ui-select-field__control ${className}`.trim()}
        disabled={disabled}
        id={controlId}
        onBlur={() => setIsOpen(false)}
        onClick={() => {
          setActiveIndex(selectedIndex)
          setIsOpen((open) => !open)
        }}
        onKeyDown={handleKeyDown}
        type="button"
      >
        <span className="ui-select-field__value">
          {selectedOption?.content ?? placeholder}
        </span>
        <span
          aria-hidden="true"
          className={`ui-select-field__chevron${isOpen ? ' ui-select-field__chevron--open' : ''}`}
        />
      </button>
      {isOpen && (
        <div
          className="ui-select-field__menu"
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel ?? label}
        >
          {options.map((option, index) => (
            <div
              aria-disabled={option.disabled || undefined}
              aria-selected={option.value === value}
              className={`ui-select-field__option${index === activeIndex ? ' ui-select-field__option--active' : ''}`}
              id={`${listboxId}-${index}`}
              key={option.value}
              onClick={() => chooseOption(index)}
              onMouseDown={(event) => event.preventDefault()}
              role="option"
            >
              {option.content}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
