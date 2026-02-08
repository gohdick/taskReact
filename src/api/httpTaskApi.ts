import { TASK_STATUSES, type Task, type TaskStatus } from '../types/task'
import { apiFetch } from './apiFetch'
import type { TaskApi, TaskListParams } from './taskApi'

const buildQuery = (params?: TaskListParams) => {
  if (!params?.status) return ''

  const usp = new URLSearchParams({ status: params.status })
  return `?${usp.toString()}`
}

const isTaskStatus = (value: unknown): value is TaskStatus => {
  return typeof value === 'string' && (TASK_STATUSES as readonly string[]).includes(value)
}

const normalizeTask = (raw: unknown): Task => {
  const resolved =
    raw && typeof raw === 'object' && 'data' in (raw as Record<string, unknown>)
      ? (raw as Record<string, unknown>).data
      : raw

  if (!resolved || typeof resolved !== 'object') {
    throw new Error('Invalid task payload')
  }

  const obj = resolved as Record<string, unknown>

  const id = Number(obj.id)
  if (!Number.isFinite(id)) {
    throw new Error('Invalid task id')
  }

  const status = obj.status
  if (!isTaskStatus(status)) {
    throw new Error('Invalid task status')
  }

  const created_at = (obj.created_at ?? obj.createdAt) as string
  const updated_at = (obj.updated_at ?? obj.updatedAt) as string

  return {
    id,
    title: String(obj.title ?? ''),
    description: (obj.description as string | undefined) ?? undefined,
    status,
    created_at,
    updated_at,
  }
}

const normalizeTaskList = (raw: unknown): Task[] => {
  const resolved =
    raw && typeof raw === 'object' && 'data' in (raw as Record<string, unknown>)
      ? (raw as Record<string, unknown>).data
      : raw

  if (!Array.isArray(resolved)) return []
  return resolved.map(normalizeTask)
}

export const createHttpTaskApi = (baseUrl: string): TaskApi => {
  const list: TaskApi['list'] = async (params) => {
    const raw = await apiFetch<unknown>(`${baseUrl}/tasks${buildQuery(params)}`)
    return normalizeTaskList(raw)
  }

  const create: TaskApi['create'] = async (input) => {
    const raw = await apiFetch<unknown>(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    return normalizeTask(raw)
  }

  const update: TaskApi['update'] = async (id, patch) => {
    const raw = await apiFetch<unknown>(`${baseUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
    return normalizeTask(raw)
  }

  const remove: TaskApi['remove'] = async (id) => {
    await apiFetch<unknown>(`${baseUrl}/tasks/${id}`, {
      method: 'DELETE',
    })
  }

  return {
    list,
    create,
    update,
    remove,
  }
}
