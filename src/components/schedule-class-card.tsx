import { Badge } from '../ui/badge'
import {
  formatTimetableTime,
  getScheduleClassStatus,
  type ClassStatus,
  type ScheduleClass,
} from '../features/schedule'

export type { ClassStatus, ScheduleClass } from '../features/schedule'

type ScheduleClassCardProps = {
  classItem: ScheduleClass
  currentDay: string
  currentTime: Date | null
}

const statusLabels: Record<ClassStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  upcoming: 'Upcoming',
}

export function ScheduleClassCard({
  classItem,
  currentDay,
  currentTime,
}: ScheduleClassCardProps) {
  const status = currentTime
    ? getScheduleClassStatus(classItem, currentDay, currentTime)
    : 'upcoming'
  const active = status === 'in-progress'
  const isBreak = classItem.kind === 'Break'

  return (
    <article className={`course-card${isBreak ? ' course-card--break' : ''}`}>
      <div
        className={`course-card__header${active ? ' course-card__header--active' : ''}`}
      >
        <span>
          {formatTimetableTime(classItem.startTime)} –{' '}
          {formatTimetableTime(classItem.endTime)}
        </span>
        <Badge
          className={active ? 'course-card__status--active' : ''}
          variant={active ? 'ink' : 'paper'}
        >
          {statusLabels[status]}
        </Badge>
      </div>

      <div className="course-card__body">
        <div>
          {classItem.code && (
            <div className="course-card__identity">
              <Badge variant="ink">{classItem.code}</Badge>
            </div>
          )}
          <h3 className="course-card__heading">{classItem.title}</h3>
          {classItem.faculty && (
            <div className="course-card__faculty">
              <span>{classItem.faculty}</span>
            </div>
          )}
        </div>

        <footer className="course-card__footer">
          <span>
            {classItem.duration} mins &bull; {classItem.kind}
          </span>
        </footer>
      </div>
    </article>
  )
}
