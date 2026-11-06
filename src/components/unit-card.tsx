import { Badge } from '../ui/badge'
import { ChecklistItem } from '../ui/checklist-item'

export type UnitTopic = {
  title: string
  checked?: boolean
}

export type Unit = {
  number: number | string
  title: string
  hours: string
  topics: UnitTopic[]
}

type UnitCardProps = {
  unit: Unit
  sectionLabel?: string
  footerLabel?: string
  footerValue?: string
}

export function UnitCard({
  unit,
  sectionLabel = 'Unit',
  footerLabel = 'Section specification',
  footerValue,
}: UnitCardProps) {
  return (
    <article className="unit-card">
      <header className="unit-card__header">
        <div className="unit-card__title-group">
          <Badge variant="amber">
            {sectionLabel} {unit.number}
          </Badge>
          <h3 className="unit-card__title">{unit.title}</h3>
        </div>
        <span className="unit-card__hours">{unit.hours}</span>
      </header>

      <ul className="unit-card__topics">
        {unit.topics.map((topic) => (
          <li key={topic.title}>
            <ChecklistItem
              defaultChecked={topic.checked ?? true}
            >
              {topic.title}
            </ChecklistItem>
          </li>
        ))}
      </ul>

      <footer className="unit-card__footer">
        <span>{footerLabel}</span>
        <strong>{footerValue ?? `Mod. ${unit.number}`}</strong>
      </footer>
    </article>
  )
}
