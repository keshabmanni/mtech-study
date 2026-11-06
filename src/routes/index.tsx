import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  ScheduleClassCard,
  SectionHeading,
  SubjectOverview,
  SubjectSelector,
  UnitCard,
} from '../components'
import {
  getSubjectOptions,
  isProjectCourse,
  subjects,
  toCurriculumUnits,
  toProjectReportUnits,
  toSubjectOverview,
} from '../data'
import {
  formatTimetableTime,
  getScheduleClassStatus,
  getScheduleForDay,
  timetableDayLabels,
  timetableDays,
  type TimetableDay,
  useNepalClock,
} from '../features/schedule'
import { Badge, Button, Panel } from '../ui'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [selectedCode, setSelectedCode] = useState('MCS 657')
  const [selectedDay, setSelectedDay] = useState<TimetableDay>('Friday')
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const { currentTime, currentDay: nepalDay } = useNepalClock()

  useEffect(() => {
    if (!nepalDay) return

    const todayScheduleDay = timetableDays.find((day) => day === nepalDay)
    if (todayScheduleDay) setSelectedDay(todayScheduleDay)
  }, [nepalDay])

  const subject = subjects.find((item) => item.subject_code === selectedCode)

  if (!subject) {
    throw new Error(`Course data is missing for ${selectedCode}.`)
  }

  const projectCourse = isProjectCourse(subject)
  const currentDay = nepalDay ?? 'Friday'
  const timetableCards = getScheduleForDay(selectedDay)
  const activeEntry = currentTime
    ? timetableCards.find(
        (entry) =>
          getScheduleClassStatus(entry, currentDay, currentTime) ===
          'in-progress',
      )
    : undefined
  const subjectOptions = getSubjectOptions(subjects)
  const overview = toSubjectOverview(subject)
  const units = toCurriculumUnits(subject)
  const reportSections = toProjectReportUnits(subject)

  return (
    <main className="gazette-shell">
      {/* Class Schedule Section */}
      <section aria-label="Weekly timetable" className="schedule-section">
        <div className="schedule-toolbar">
          <div className="schedule-toolbar__controls">
            <Badge variant="ink">
              <span aria-hidden="true">▦</span> Timetable
            </Badge>
            <div
              aria-label="Timetable day"
              className="schedule-day-tabs"
              role="group"
            >
              {timetableDays.map((day) => (
                <Button
                  aria-current={currentDay === day ? 'date' : undefined}
                  aria-pressed={selectedDay === day}
                  className="schedule-day-tab"
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  variant="plain"
                >
                  {timetableDayLabels[day]}
                  {currentDay === day ? ' (Today)' : ''}
                </Button>
              ))}
            </div>
            <Badge>{timetableCards.length} Classes</Badge>
            {!scheduleOpen && activeEntry && (
              <Badge className="schedule-preview" variant="amber">
                <span aria-hidden="true" className="schedule-preview__dot" />
                In progress: {activeEntry.code ?? activeEntry.title} (
                {formatTimetableTime(activeEntry.startTime)} –{' '}
                {formatTimetableTime(activeEntry.endTime)})
              </Badge>
            )}
          </div>
          <Button
            aria-expanded={scheduleOpen}
            aria-label={scheduleOpen ? 'Collapse timetable' : 'Expand timetable'}
            className="schedule-toggle"
            onClick={() => setScheduleOpen((open) => !open)}
            square
            variant="plain"
          >
            <span aria-hidden="true">{scheduleOpen ? '⌃' : '⌄'}</span>
          </Button>
        </div>

        {scheduleOpen && (
          <div className="schedule-content">
            <div className="schedule-grid">
              {timetableCards.map((classItem) => (
                <ScheduleClassCard
                  classItem={classItem}
                  currentDay={currentDay}
                  currentTime={currentTime}
                  key={`${selectedDay}-${classItem.startTime}-${classItem.title}`}
                />
              ))}
            </div>
          </div>
        )}
      </section>

{/* Subjects Selection Section */}
      <section aria-label="Choose a course" className="selector-section">
        <SubjectSelector
          onChange={setSelectedCode}
          projectHours={
            projectCourse ? `${subject.project_total_hours}h` : undefined
          }
          practicalHours={`${subject.practical_total_hours}h`}
          subjects={subjectOptions}
          theoryHours={`${subject.theory_total_hours}h`}
          value={selectedCode}
        />
      </section>
      
      {/* Subjects Overview Section */}
      <section className="overview-section">
        <SubjectOverview subject={overview} />
      </section>

      <section
        aria-labelledby="curriculum-heading"
        className="curriculum-section"
      >
        <SectionHeading
          count={`${units.length} ${projectCourse ? 'Phases' : 'Units'}`}
          id="curriculum-heading"
          title={
            projectCourse
              ? 'Project implementation guidelines'
              : 'Theory modules & chapters'
          }
        />
        <div className="unit-grid">
          {units.map((unit) => (
            <UnitCard
              footerLabel={
                projectCourse ? 'Implementation checklist' : undefined
              }
              key={unit.number}
              footerValue={projectCourse ? `Section ${unit.number}` : undefined}
              sectionLabel={projectCourse ? 'Section' : undefined}
              unit={unit}
            />
          ))}
        </div>
      </section>

      {projectCourse ? (
        <section
          aria-labelledby="report-heading"
          className="practical-section"
        >
          <SectionHeading
            count={`${reportSections.length} Sections`}
            id="report-heading"
            title="Project report & thesis requirements"
          />
          <div className="unit-grid">
            {reportSections.map((unit) => (
              <UnitCard
                footerLabel="Report specification"
                key={unit.number}
                footerValue={`Section ${unit.number}`}
                sectionLabel="Section"
                unit={unit}
              />
            ))}
          </div>
        </section>
      ) : (
        <section
          aria-labelledby="practical-heading"
          className="practical-section"
        >
          <SectionHeading
            count={`${subject.practical.length} Labs`}
            id="practical-heading"
            title="Practical lab work & experiments"
          />
          <p className="section-description">
            Hands-on work and practical activities from the course outline.
          </p>
          <div className="practical-grid">
            {subject.practical.map((practical, index) => (
              <Panel
                className="practical-card"
                key={`${subject.subject_code}-${practical}`}
                raised
              >
                <Badge variant="amber">
                  Lab {String(index + 1).padStart(2, '0')}
                </Badge>
                <p>{practical}</p>
                <span aria-hidden="true" className="practical-card__arrow">
                  ↗
                </span>
              </Panel>
            ))}
          </div>
        </section>
      )}

      <footer className="gazette-footer">
        <span>MTech Study &bull; Semester II curriculum</span>
        <span>{subjects.length} courses in this edition</span>
      </footer>
      <div aria-hidden="true" className="gazette-hatch gazette-hatch--bottom" />
    </main>
  )
}
