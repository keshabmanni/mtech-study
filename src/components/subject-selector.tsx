import { SelectField } from '../ui/select-field'

export type SubjectOption = {
  code: string
  name: string
}

type SubjectSelectorProps = {
  subjects: SubjectOption[]
  value: string
  theoryHours: string
  practicalHours: string
  projectHours?: string
  onChange: (value: string) => void
}

export function SubjectSelector({
  subjects,
  value,
  onChange,
}: SubjectSelectorProps) {

  return (
    <div className="subject-selector">
      <SelectField
        aria-label="Select a subject"
        className="subject-selector__control"
        onChange={onChange}
        value={value}
      >
        {subjects.map((subject) => (
          <option key={subject.code} value={subject.code}>
            {subject.code} — {subject.name}
          </option>
        ))}
      </SelectField>
    </div>
  )
}
