import type { FC, FormEvent } from 'react'
import { useState } from 'react'
import { z } from 'zod'

type Props = {
  isLoading: boolean
  onCreate: (input: { title: string; description?: string }) => void
}

const schema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
})

export const TaskForm: FC<Props> = ({ isLoading, onCreate }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({})

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    const parsed = schema.safeParse({ title, description })
    if (!parsed.success) {
      const nextErrors: { title?: string; description?: string } = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (key === 'title' || key === 'description') {
          nextErrors[key] = issue.message
        }
      }

      setErrors(nextErrors)
      return
    }

    setErrors({})

    onCreate({
      title: parsed.data.title,
      description: parsed.data.description,
    })

    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label className="mb-1 block text-sm font-medium text-slate-600 text-base">Title 
            <span className="text-red-500 ml-1">*</span>
          </label>
          
          <input
            className={`h-10 w-full rounded-md border px-3 text-sm outline-none focus:border-slate-400 ${
              errors.title ? 'border-rose-300' : 'border-slate-200'
            }`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }))
            }}
            placeholder="e.g. Api line Payment"
          />
          {errors.title ? (
            <p className="mt-1 text-xs text-rose-600">{errors.title}</p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-slate-600 text-base font-medium">Description
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            className={`h-10 w-full rounded-md border px-3 text-sm outline-none focus:border-slate-400 ${
              errors.description ? 'border-rose-300' : 'border-slate-200'
            }`}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
              if (errors.description) {
                setErrors((prev) => ({ ...prev, description: undefined }))
              }
            }}
            placeholder="e.g. error 500 method GET /payment"
          />
          {errors.description ? (
            <p className="mt-1 text-xs text-rose-600">{errors.description}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end">
        <button
          type="submit"
          className="h-10 rounded-md bg-[#0eb009] px-4 text-sm font-medium text-white disabled:opacity-50 hover:bg-[#0eb009]/80"
          disabled={isLoading}
        >
          Add task
        </button>
      </div>
    </form>
  )
}
