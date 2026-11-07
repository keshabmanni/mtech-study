import { useEffect, useState } from 'react'
import { timetableData } from '../../data/timetable'
import type { TimetableDay } from '../../data/timetable'

export type ClassStatus = 'completed' | 'in-progress' | 'upcoming'

export type { TimetableDay } from '../../data/timetable'

export type ScheduleClass = {
  day: string
  code: string | null
  title: string
  startTime: string
  endTime: string
  faculty: string | null
  duration: number
  kind: string
}

export const timetableDays: TimetableDay[] = [
  'Thursday',
  'Friday',
  'Saturday',
]

export const timetableDayLabels: Record<TimetableDay, string> = {
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
}

export function getScheduleForDay(day: TimetableDay): ScheduleClass[] {
  return timetableData
    .filter((entry) => entry.day === day)
    .map((entry) => ({
      day: entry.day,
      code: entry.subject_code,
      title: entry.subject_name,
      startTime: entry.start_time,
      endTime: entry.end_time,
      faculty: entry.faculty_full_name,
      duration: entry.duration,
      kind: entry.session_type,
    }))
}

export function getNepalDay(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kathmandu',
    weekday: 'long',
  }).format(date)
}

export function useNepalClock() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date())
    updateTime()

    const timer = window.setInterval(updateTime, 60_000)
    return () => window.clearInterval(timer)
  }, [])

  return {
    currentTime,
    currentDay: currentTime ? getNepalDay(currentTime) : null,
  }
}

export function formatTimetableTime(time: string) {
  const minutes = getMinutes(time)
  const hours = Math.floor(minutes / 60)
  const period = hours < 12 ? 'AM' : 'PM'
  const displayHours = hours % 12 || 12

  return `${displayHours}:${String(minutes % 60).padStart(2, '0')} ${period}`
}

export function getScheduleClassStatus(
  classItem: ScheduleClass,
  currentDay: string,
  currentTime: Date,
): ClassStatus {
  const classDayIndex = dayOrder.indexOf(classItem.day)
  const currentDayIndex = dayOrder.indexOf(currentDay)

  if (classDayIndex === -1 || currentDayIndex === -1) {
    throw new Error(`Unknown timetable day: ${classItem.day} or ${currentDay}.`)
  }

  if (classDayIndex < currentDayIndex) return 'completed'
  if (classDayIndex > currentDayIndex) return 'upcoming'

  const timeParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kathmandu',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(currentTime)
  const hours = Number(timeParts.find((part) => part.type === 'hour')?.value)
  const minutes = Number(
    timeParts.find((part) => part.type === 'minute')?.value,
  )
  const nowInMinutes = hours * 60 + minutes
  const start = getMinutes(classItem.startTime)
  const end = getMinutes(classItem.endTime)

  if (nowInMinutes >= end) return 'completed'
  if (nowInMinutes >= start) return 'in-progress'
  return 'upcoming'
}

const dayOrder = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

function getMinutes(time: string) {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time)

  if (!match) {
    throw new Error(`Invalid timetable time "${time}". Expected HH:mm.`)
  }

  return Number(match[1]) * 60 + Number(match[2])
}
