import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import {
  AppLoader,
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
  const [initialSelectionReady, setInitialSelectionReady] = useState(false)
  const subjectWasManuallySelected = useRef(false)
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
  const currentEntry = currentTime
    ? timetableCards.find(
      (entry) =>
        entry.kind !== 'Break' &&
        getScheduleClassStatus(entry, currentDay, currentTime) ===
        'in-progress',
    )
    : undefined
  const previewEntry = currentEntry ?? (currentTime
    ? timetableCards.find(
      (entry) =>
        entry.kind !== 'Break' &&
        getScheduleClassStatus(entry, currentDay, currentTime) ===
        'upcoming',
    )
    : undefined)
  const previewSubjectNumber = previewEntry?.code?.match(/\d+$/)?.[0]
  const previewSubjectCode = previewSubjectNumber
    ? subjects.find((item) =>
      item.subject_code.endsWith(previewSubjectNumber),
    )?.subject_code
    : undefined
  const todayScheduleDay = timetableDays.find((day) => day === nepalDay)

  useEffect(() => {
    if (!nepalDay || (todayScheduleDay && selectedDay !== todayScheduleDay)) {
      return
    }

    if (!subjectWasManuallySelected.current && previewSubjectCode) {
      if (selectedCode !== previewSubjectCode) {
        setSelectedCode(previewSubjectCode)
        return
      }
    }

    setInitialSelectionReady(true)
  }, [
    nepalDay,
    previewSubjectCode,
    selectedCode,
    selectedDay,
    todayScheduleDay,
  ])

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
                  className={`schedule-day-tab${currentDay === day ? ' schedule-day-tab--today' : ''}`}
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  variant="plain"
                >
                  {currentDay === day && (
                    <span aria-hidden="true" className="schedule-day-tab__dot" />
                  )}
                  {timetableDayLabels[day]}
                  {/* {currentDay === day ? ' (Today)' : ''} */}
                </Button>
              ))}
            </div>
            <Badge>{timetableCards.length} Classes</Badge>
          </div>
          <div className="schedule-toolbar__summary">
            {!scheduleOpen && previewEntry && (
              <Badge className="schedule-preview" variant="ink">
                <span aria-hidden="true" className="schedule-preview__dot" />
                {currentEntry ? 'Current' : 'Next'}: {previewEntry.title}
              </Badge>
            )}
            <Button
              aria-expanded={scheduleOpen}
              aria-label={
                scheduleOpen ? 'Collapse timetable' : 'Expand timetable'
              }
              className="schedule-toggle"
              onClick={() => setScheduleOpen((open) => !open)}
              variant="plain"
            >
              <span aria-hidden="true">{scheduleOpen ? 'Hide' : 'Show'}</span>
              <svg
                aria-hidden="true"
                className="schedule-toggle__icon"
                viewBox="0 0 16 16"
                fill="none"
              >
                {scheduleOpen ? (
                  <path
                    d="m3 10 5-5 5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="m3 6 5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </Button>
          </div>
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

      {/* Subjects Overview Section */}
      <section className="overview-section">
        <SubjectOverview
          selector={
            <SubjectSelector
              onChange={(code) => {
                subjectWasManuallySelected.current = true
                setSelectedCode(code)
              }}
              subjects={subjectOptions}
              value={selectedCode}
            />
          }
          subject={overview}
        />
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
      {!initialSelectionReady && (
        <AppLoader message="Loading today’s schedule" />
      )}
    </main>
  )
}
