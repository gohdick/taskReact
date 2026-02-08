import type { Task } from '../types/task'
import type { TaskApi, TaskListParams } from './taskApi'

const buildQuery = (params?: TaskListParams) => {
  if (!params?.status) return ''

  const usp = new URLSearchParams({ status: params.status })
  return `?${usp.toString()}`
}

const safeJson = async <T,>(res: Response) => {
  const text = await res.text()
  if (!text) return undefined as T

  return JSON.parse(text) as T
}

export const createHttpTaskApi = (baseUrl: string): TaskApi => {
  const list: TaskApi['list'] = async (params) => {
    const res = await fetch(`${baseUrl}/tasks${buildQuery(params)}`)
    if (!res.ok) {
      throw new Error(`Failed to fetch tasks (${res.status})`)
    }

    return safeJson<Task[]>(res)
  }

  const create: TaskApi['create'] = async (input) => {
    const res = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })

    if (!res.ok) {
      throw new Error(`Failed to create task (${res.status})`)
    }

    return safeJson<Task>(res)
  }

  const update: TaskApi['update'] = async (id, patch) => {
    const res = await fetch(`${baseUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })

    if (!res.ok) {
      throw new Error(`Failed to update task (${res.status})`)
    }

    return safeJson<Task>(res)
  }

  const remove: TaskApi['remove'] = async (id) => {
    const res = await fetch(`${baseUrl}/tasks/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error(`Failed to delete task (${res.status})`)
    }
  }

  return {
    list,
    create,
    update,
    remove,
  }
}
