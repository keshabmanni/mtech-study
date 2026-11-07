import { env } from 'cloudflare:workers'
import type { ProjectSection, SubjectData } from './subjects'

type SubjectRow = Omit<
  SubjectData,
  | 'theory'
  | 'practical'
  | 'project_total_hours'
  | 'project_implementation_guidelines'
  | 'project_report_guidelines'
> & {
  project_total_hours: number
  theory_units: string | null
  practicals: string | null
  project_implementation_guidelines: string | null
  project_report_guidelines: string | null
}

export async function listSubjects(): Promise<SubjectData[]> {
  const { results } = await env.DB.prepare(`
    SELECT
      subject_code,
      subject_name,
      professor_1,
      professor_2,
      theory_total_hours,
      practical_total_hours,
      project_total_hours,
      theory_units,
      practicals,
      project_implementation_guidelines,
      project_report_guidelines
    FROM subjects
    ORDER BY subject_code
  `).all<SubjectRow>()

  if (results.length === 0) {
    throw new Error('No subjects were found in the D1 database.')
  }

  return results.map((row) => ({
    subject_code: row.subject_code,
    subject_name: row.subject_name,
    professor_1: row.professor_1,
    professor_2: row.professor_2,
    theory_total_hours: row.theory_total_hours,
    practical_total_hours: row.practical_total_hours,
    ...(row.project_total_hours > 0
      ? { project_total_hours: row.project_total_hours }
      : {}),
    theory: parseJsonArray(
      row.theory_units,
      row.subject_code,
      'theory_units',
      isTheoryUnit,
    ),
    practical: parseJsonArray(
      row.practicals,
      row.subject_code,
      'practicals',
      isString,
    ),
    ...(row.project_implementation_guidelines !== null
      ? {
          project_implementation_guidelines: parseJsonArray(
            row.project_implementation_guidelines,
            row.subject_code,
            'project_implementation_guidelines',
            isProjectSection,
          ),
        }
      : {}),
    ...(row.project_report_guidelines !== null
      ? {
          project_report_guidelines: parseJsonArray(
            row.project_report_guidelines,
            row.subject_code,
            'project_report_guidelines',
            isProjectSection,
          ),
        }
      : {}),
  }))
}

function parseJsonArray<T>(
  value: string | null,
  subjectCode: string,
  column: string,
  isItem: (item: unknown) => item is T,
): T[] {
  if (value === null) {
    throw new Error(`Subject ${subjectCode} is missing ${column} data.`)
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(value)
  } catch (cause) {
    throw new Error(
      `Subject ${subjectCode} has invalid JSON in ${column}.`,
      { cause },
    )
  }

  if (!Array.isArray(parsed) || !parsed.every(isItem)) {
    throw new Error(`Subject ${subjectCode} has invalid ${column} data.`)
  }

  return parsed
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isTheoryUnit(value: unknown): value is SubjectData['theory'][number] {
  return (
    isRecord(value) &&
    typeof value.unit_no === 'number' &&
    typeof value.unit_title === 'string' &&
    typeof value.hours === 'number' &&
    (typeof value.professor === 'string' || value.professor === null) &&
    Array.isArray(value.chapters) &&
    value.chapters.every(isString)
  )
}

function isProjectSection(value: unknown): value is ProjectSection {
  return (
    isRecord(value) &&
    typeof value.section_no === 'string' &&
    typeof value.section_title === 'string' &&
    (value.guidelines === undefined ||
      (Array.isArray(value.guidelines) && value.guidelines.every(isString))) &&
    (value.details === undefined ||
      (Array.isArray(value.details) && value.details.every(isString)))
  )
}
