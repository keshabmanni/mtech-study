import { createServerFn } from '@tanstack/react-start'
import { listSubjects } from './subjects.server'

export const getSubjects = createServerFn({ method: 'GET' }).handler(
  () => listSubjects(),
)
