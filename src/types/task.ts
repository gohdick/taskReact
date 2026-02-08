export const TASK_STATUSES = ['To Do', 'In Progress', 'Done'] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]

export type Task = {
  id: string
  title: string
  description?: string
  status: TaskStatus
  created_at: string
  updated_at: string
}

export type TaskCreateInput = {
  title: string
  description?: string
}

export type TaskUpdateInput = {
  title?: string
  description?: string
  status?: TaskStatus
}
