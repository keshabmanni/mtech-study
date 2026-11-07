import type {
  SubjectOption,
  SubjectOverviewData,
  Unit,
} from '../components'
import type { ProjectSection, SubjectData } from './subjects'

export function getSubjectOptions(subjects: SubjectData[]): SubjectOption[] {
  return subjects.map((subject) => ({
    code: subject.subject_code,
    name: subject.subject_name,
  }))
}

export function isProjectCourse(subject: SubjectData) {
  return subject.project_total_hours !== undefined
}

export function toSubjectOverview(
  subject: SubjectData,
): SubjectOverviewData {
  const projectCourse = isProjectCourse(subject)

  return {
    code: subject.subject_code,
    title: subject.subject_name,
    semester: 'Semester II',
    category: projectCourse ? 'Project' : 'Core',
    faculties: [
      { name: subject.professor_1 },
      ...(subject.professor_2
        ? [{ name: subject.professor_2 }]
        : []),
    ],
    metrics: projectCourse
      ? []
      : [
          { label: 'T', value: `${subject.theory_total_hours} hrs` },
          {
            label: 'P',
            value: `${subject.practical_total_hours} hrs`,
          },
        ],
  }
}

export function toCurriculumUnits(subject: SubjectData): Unit[] {
  if (isProjectCourse(subject)) {
    return (subject.project_implementation_guidelines ?? []).map((section) =>
      toProjectUnit(section),
    )
  }

  return subject.theory.map((unit) => ({
    number: unit.unit_no,
    title: unit.unit_title,
    hours: `${unit.hours} hours`,
    professor: unit.professor,
    topics: unit.chapters.map((title) => ({ title })),
  }))
}

export function toProjectReportUnits(subject: SubjectData): Unit[] {
  return (subject.project_report_guidelines ?? []).map((section) =>
    toProjectUnit(section),
  )
}

export function getProjectSectionNumber(section: ProjectSection) {
  return section.section_no.replace(/^Section\s+/i, '')
}

function toProjectUnit(section: ProjectSection): Unit {
  const points = getProjectPoints(section)

  return {
    number: getProjectSectionNumber(section),
    title: section.section_title,
    hours: `${points.length} items`,
    professor: null,
    topics: points.map((title) => ({ title })),
  }
}

function getProjectPoints(section: ProjectSection) {
  const points = section.guidelines ?? section.details

  if (!points) {
    throw new Error(`Project section "${section.section_no}" has no details.`)
  }

  return points
}
