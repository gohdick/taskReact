export const TASK_STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
}

export type Task = {
  id: number
  title: string
  description?: string
  status: TaskStatus
  created_at: string
  updated_at: string
}

export type TaskCreateInput = {
  title: string
  description?: string
  status?: TaskStatus
}

export type TaskUpdateInput = {
  title?: string
  description?: string
  status?: TaskStatus
}
