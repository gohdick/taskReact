import { create } from 'zustand'
import { taskApi } from '../api'
import type { Task, TaskCreateInput, TaskStatus, TaskUpdateInput } from '../types/task'

export type TaskFilterStatus = TaskStatus | 'All'

type TaskState = {
  tasks: Task[]
  filterStatus: TaskFilterStatus
  isLoading: boolean
  error: string | null

  setFilterStatus: (status: TaskFilterStatus) => void
  fetchTasks: () => Promise<void>
  createTask: (input: TaskCreateInput) => Promise<void>
  updateTask: (id: string, patch: TaskUpdateInput) => Promise<void>
  deleteTask: (id: string) => Promise<void>
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filterStatus: 'All',
  isLoading: false,
  error: null,

  setFilterStatus: (status) => {
    set({ filterStatus: status })
    void get().fetchTasks()
  },

  fetchTasks: async () => {
    set({ isLoading: true, error: null })

    try {
      const { filterStatus } = get()
      const tasks = await taskApi.list(
        filterStatus === 'All' ? undefined : { status: filterStatus },
      )

      set({ tasks, isLoading: false })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      set({ isLoading: false, error: message })
    }
  },

  createTask: async (input) => {
    set({ isLoading: true, error: null })

    try {
      await taskApi.create(input)
      await get().fetchTasks()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      set({ isLoading: false, error: message })
    }
  },

  updateTask: async (id, patch) => {
    const prevTasks = get().tasks

    set({ error: null })

    set({
      tasks: prevTasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    })

    try {
      await taskApi.update(id, patch)
      await get().fetchTasks()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      set({ tasks: prevTasks, error: message })
    }
  },

  deleteTask: async (id) => {
    const prevTasks = get().tasks

    set({ error: null, tasks: prevTasks.filter((t) => t.id !== id) })

    try {
      await taskApi.remove(id)
      await get().fetchTasks()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      set({ tasks: prevTasks, error: message })
    }
  },
}))
