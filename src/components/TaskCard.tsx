import type { FC } from 'react'

import { Trash2 } from 'lucide-react'
import { formatThaiDateTime } from '../utils/date'
import { TASK_STATUSES, TASK_STATUS_LABEL, type Task, type TaskStatus } from '../types/task'

type Props = {
  task: Task
  onStatusChange: (id: number, status: TaskStatus) => void
  onDelete: (id: number) => void
}

const statusStyles: Record<TaskStatus, string> = {
  TODO: 'bg-slate-100 text-slate-700',
  IN_PROGRESS: 'bg-amber-100 text-amber-800',
  DONE: 'bg-emerald-100 text-emerald-800',
}

export const TaskCard: FC<Props> = ({ task, onStatusChange, onDelete }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-slate-900">{task.title}</h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[task.status]}`}>
              {TASK_STATUS_LABEL[task.status]}
            </span>
          </div>
          {task.description ? (
            <p className="mt-1 text-sm text-slate-600">{task.description}</p>
          ) : null}
          <p className="mt-2 text-xs text-slate-400">Updated: {formatThaiDateTime(task.updated_at)}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <select
            className="h-9 rounded-md border border-slate-200 bg-white px-2 text-sm"
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          >
            {TASK_STATUSES.map((s) => (
              <option key={s} value={s}>
                {TASK_STATUS_LABEL[s]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label="Delete"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md 
                      text-[#c40c3a] hover:bg-[#c40c3a]/10"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
