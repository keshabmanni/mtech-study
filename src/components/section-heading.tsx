import { Badge } from '../ui/badge'

type SectionHeadingProps = {
  title: string
  count?: string
  id?: string
}

export function SectionHeading({ title, count, id }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <h2 className="section-heading__title" id={id}>
        <span aria-hidden="true" className="section-heading__marker" />
        {title}
      </h2>
      {count && <Badge variant="ink">{count}</Badge>}
    </div>
  )
}
