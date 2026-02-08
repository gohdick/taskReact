import type { Task, TaskCreateInput, TaskStatus, TaskUpdateInput } from '../types/task'
import type { TaskApi, TaskListParams } from './taskApi'

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

const generateId = () => {
  if (globalThis.crypto && 'randomUUID' in globalThis.crypto) {
    return globalThis.crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const nowIso = () => new Date().toISOString()

let tasks: Task[] = [
  {
    id: generateId(),
    title: 'Design UI layout',
    description: 'Simple card list + form',
    status: 'To Do',
    created_at: nowIso(),
    updated_at: nowIso(),
  },
  {
    id: generateId(),
    title: 'Implement Zustand store',
    description: 'CRUD + filter',
    status: 'In Progress',
    created_at: nowIso(),
    updated_at: nowIso(),
  },
]

const list = async (params?: TaskListParams) => {
  await delay(200)

  const status = params?.status
  const result = status ? tasks.filter((t) => t.status === status) : tasks

  return result
    .slice()
    .sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1))
}

const create = async (input: TaskCreateInput) => {
  await delay(200)

  const title = input.title.trim()
  if (!title) {
    throw new Error('Title is required')
  }

  const task: Task = {
    id: generateId(),
    title,
    description: input.description?.trim() || undefined,
    status: 'To Do',
    created_at: nowIso(),
    updated_at: nowIso(),
  }

  tasks = [task, ...tasks]

  return task
}

const update = async (id: string, patch: TaskUpdateInput) => {
  await delay(200)

  const task = tasks.find((t) => t.id === id)
  if (!task) {
    throw new Error('Task not found')
  }

  const nextTitle = patch.title === undefined ? task.title : patch.title.trim()
  if (!nextTitle) {
    throw new Error('Title is required')
  }

  const next: Task = {
    ...task,
    title: nextTitle,
    description:
      patch.description === undefined
        ? task.description
        : patch.description.trim() || undefined,
    status: (patch.status as TaskStatus | undefined) ?? task.status,
    updated_at: nowIso(),
  }

  tasks = tasks.map((t) => (t.id === id ? next : t))

  return next
}

const remove = async (id: string) => {
  await delay(200)
  tasks = tasks.filter((t) => t.id !== id)
}

export const mockTaskApi: TaskApi = {
  list,
  create,
  update,
  remove,
}
