import { mockTaskApi } from './mockTaskApi'
import { createHttpTaskApi } from './httpTaskApi'
import type { TaskApi } from './taskApi'

const useMock = (import.meta.env.VITE_USE_MOCK_API ?? 'true') === 'true'
const baseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? ''

export const taskApi: TaskApi = useMock ? mockTaskApi : createHttpTaskApi(baseUrl)
