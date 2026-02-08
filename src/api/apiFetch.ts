type ApiSuccess<T> = {
  success: true
  data: T
}

type ApiError = {
  success: false
  message?: string
  statusCode?: number
}

type ApiEnvelope<T> = ApiSuccess<T> | ApiError

const safeJson = async <T,>(res: Response) => {
  const text = await res.text()
  if (!text) return undefined as T
  return JSON.parse(text) as T
}

const toErrorMessage = (payload: unknown) => {
  if (!payload) return undefined
  if (typeof payload === 'string') return payload

  if (typeof payload === 'object') {
    const obj = payload as Record<string, unknown>
    const msg = obj.message

    if (typeof msg === 'string') return msg

    if (Array.isArray(msg)) {
      const parts = msg.filter((x): x is string => typeof x === 'string')
      if (parts.length) return parts.join(', ')
    }

    if (typeof obj.error === 'string') return obj.error
  }

  return undefined
}

export const apiFetch = async <T,>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> => {
  const res = await fetch(input, init)
  const payload = await safeJson<unknown>(res)

  if (!res.ok) {
    const msg = toErrorMessage(payload) ?? `Request failed (${res.status})`
    throw new Error(msg)
  }

  if (
    payload &&
    typeof payload === 'object' &&
    'success' in payload &&
    (payload as ApiEnvelope<unknown>).success === false
  ) {
    const env = payload as ApiError
    throw new Error(env.message ?? `Request failed (${res.status})`)
  }

  if (payload && typeof payload === 'object' && 'success' in payload) {
    return (payload as ApiSuccess<T>).data
  }

  return payload as T
}
