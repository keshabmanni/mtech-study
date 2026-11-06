import semesterTwo from '../../mock-data/sem2_detailed.json'

export type ProjectSection = {
  section_no: string
  section_title: string
  guidelines?: string[]
  details?: string[]
}

export type SubjectData = {
  subject_name: string
  subject_code: string
  professor_1: string
  professor_2: string | null
  theory_total_hours: number
  practical_total_hours: number
  project_total_hours?: number
  theory: {
    unit_no: number
    unit_title: string
    hours: number
    chapters: string[]
  }[]
  practical: string[]
  project_implementation_guidelines?: ProjectSection[]
  project_report_guidelines?: ProjectSection[]
}

export const subjects: SubjectData[] = semesterTwo
