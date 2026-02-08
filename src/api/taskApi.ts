import type { Task, TaskCreateInput, TaskStatus, TaskUpdateInput } from '../types/task'

export type TaskListParams = {
  status?: TaskStatus
}

export type TaskApi = {
  list: (params?: TaskListParams) => Promise<Task[]>
  create: (input: TaskCreateInput) => Promise<Task>
  update: (id: string, patch: TaskUpdateInput) => Promise<Task>
  remove: (id: string) => Promise<void>
}
