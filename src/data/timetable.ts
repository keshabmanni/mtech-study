export type TimetableDay = 'Thursday' | 'Friday' | 'Saturday'
export type TimetableSessionType = 'Theory' | 'Practical' | 'Break' | 'Theory + Practical'

export type TimetableEntry = {
  day: TimetableDay
  start_time: string
  end_time: string
  duration: number
  subject_code: string | null
  subject_name: string
  faculty_full_name: string | null
  session_type: TimetableSessionType
}

export const timetableData = [
  {
    day: 'Thursday',
    start_time: '17:30',
    end_time: '19:00',
    duration: 90,
    subject_code: 'MCS/MIT 653',
    subject_name: 'Software Project Management',
    faculty_full_name:
      'Sr. Asst. Prof. Chaturbhuj Bhatt & Asst. Prof. Naman Verma',
    session_type: 'Theory',
  },
  {
    day: 'Thursday',
    start_time: '19:00',
    end_time: '20:30',
    duration: 90,
    subject_code: 'MCS/MIT 651',
    subject_name: 'Optimization Technique',
    faculty_full_name:
      'Asst. Prof. Sanjiv Regmi & Research Asst. Narendra Bahadur Shahi',
    session_type: 'Theory',
  },
  {
    day: 'Friday',
    start_time: '17:30',
    end_time: '19:00',
    duration: 90,
    subject_code: 'MCS/MIT 652',
    subject_name: 'Statistics and Probability',
    faculty_full_name: 'Ramesh Prasad Tharu',
    session_type: 'Theory',
  },
  {
    day: 'Friday',
    start_time: '19:00',
    end_time: '20:30',
    duration: 90,
    subject_code: 'MCS/MIT 654',
    subject_name: 'Data Warehouse and Data Mining',
    faculty_full_name: 'Dr. Niraj K.C',
    session_type: 'Theory',
  },
  {
    day: 'Saturday',
    start_time: '11:00',
    end_time: '12:00',
    duration: 60,
    subject_code: 'MCS/MIT 653',
    subject_name: 'Software Project Management',
    faculty_full_name:
      'Sr. Asst. Prof. Chaturbhuj Bhatt & Asst. Prof. Naman Verma',
    session_type: 'Practical',
  },
  {
    day: 'Saturday',
    start_time: '12:00',
    end_time: '13:00',
    duration: 60,
    subject_code: 'MCS/MIT 652',
    subject_name: 'Statistics and Probability',
    faculty_full_name: 'Ramesh Prasad Tharu',
    session_type: 'Practical',
  },
  {
    day: 'Saturday',
    start_time: '13:00',
    end_time: '14:00',
    duration: 60,
    subject_code: 'MCS/MIT 651',
    subject_name: 'Optimization Technique',
    faculty_full_name:
      'Asst. Prof. Sanjiv Regmi & Research Asst. Narendra Bahadur Shahi',
    session_type: 'Practical',
  },
  {
    day: 'Saturday',
    start_time: '14:00',
    end_time: '15:00',
    duration: 60,
    subject_code: 'MCS/MIT 654',
    subject_name: 'Data Warehouse and Data Mining',
    faculty_full_name: 'Dr. Niraj K.C',
    session_type: 'Practical',
  },
  {
    day: 'Saturday',
    start_time: '15:00',
    end_time: '15:30',
    duration: 30,
    subject_code: null,
    subject_name: 'Break',
    faculty_full_name: null,
    session_type: 'Break',
  },
  {
    day: 'Saturday',
    start_time: '15:30',
    end_time: '16:30',
    duration: 60,
    subject_code: 'MCS 657',
    subject_name: 'Advanced Database Management System',
    faculty_full_name: 'Dr. Niraj K.C',
    session_type: 'Theory + Practical',
  },
  {
    day: 'Saturday',
    start_time: '16:30',
    end_time: '17:30',
    duration: 60,
    subject_code: 'MCS/MIT 655',
    subject_name: 'Project Development',
    faculty_full_name: 'Asst. Prof. Prakash Gupta',
    session_type: 'Practical',
  },
] satisfies TimetableEntry[]
