import type { FC, FormEvent } from 'react'
import { useState } from 'react'
import { z } from 'zod'

type Props = {
  isLoading: boolean
  onCreate: (input: { title: string; description?: string }) => void
}

export const TaskForm: FC<Props> = ({ isLoading, onCreate }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    const nextTitle = title.trim()
    if (!nextTitle) return

    onCreate({
      title: nextTitle,
      description: description.trim() || undefined,
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
            className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Api line Payment"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm text-slate-600 text-base font-medium">Description
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-slate-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. error 500 method GET /payment"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end">
        <button
          type="submit"
          className="h-10 rounded-md bg-slate-900 px-4 text-sm font-medium text-white disabled:opacity-50 hover:bg-slate-800"
          disabled={isLoading || !title.trim()}
        >
          Add task
        </button>
      </div>
    </form>
  )
}
