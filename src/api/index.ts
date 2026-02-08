import { createHttpTaskApi } from './httpTaskApi'
import type { TaskApi } from './taskApi'

const baseUrl =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:3000'

export const taskApi: TaskApi = createHttpTaskApi(baseUrl)
