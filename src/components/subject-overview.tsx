import { useId } from 'react'
import { Badge } from '../ui/badge'

export type CourseMetric = {
  label: string
  value: string
  accent?: boolean
}

export type FacultyStamp = {
  name: string
}

export type SubjectOverviewData = {
  code: string
  title: string
  semester: string
  category: string
  faculties: FacultyStamp[]
  metrics: CourseMetric[]
}

type SubjectOverviewProps = {
  subject: SubjectOverviewData
}

export function SubjectOverview({ subject }: SubjectOverviewProps) {
  const titleId = useId()

  return (
    <section className="course-overview" aria-labelledby={titleId}>
      <div>
        <div className="course-overview__badges">
          <Badge variant="amber">{subject.code}</Badge>
          <Badge>{subject.category}</Badge>
          <div className="course-overview__metrics">
            {subject.metrics.map((metric) => (
              <div key={metric.label}>
                <Badge label={metric.label} value={metric.value} />
              </div>
            ))}
          </div>
        </div>
        <h2 className="course-overview__title" id={titleId}>
          {subject.title}
        </h2>
        <div className="course-overview__faculties">
          {subject.faculties.map((faculty) => (
            <span className="course-overview__faculty" key={faculty.name}>
              {faculty.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
