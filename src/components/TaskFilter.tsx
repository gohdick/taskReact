import type { FC } from 'react'

import { TASK_STATUSES } from '../types/task'
import type { TaskFilterStatus } from '../store/taskStore'

type Props = {
  value: TaskFilterStatus
  onChange: (value: TaskFilterStatus) => void
}

const options: TaskFilterStatus[] = ['All', ...TASK_STATUSES]

const statusStyles: Record<TaskFilterStatus, string> = {
  All: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  'To Do': 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  'In Progress': 'bg-amber-100 text-amber-900 hover:bg-amber-200',
  Done: 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200',
}

const activeStyles: Record<TaskFilterStatus, string> = {
  All: 'bg-slate-900 text-white hover:bg-slate-800',
  'To Do': 'bg-slate-900 text-white hover:bg-slate-800',
  'In Progress': 'bg-amber-500 text-white hover:bg-amber-600',
  Done: 'bg-emerald-600 text-white hover:bg-emerald-700',
}

export const TaskFilter: FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`h-8 rounded-full px-4 text-xs font-semibold transition-colors ${
            value === opt ? activeStyles[opt] : statusStyles[opt]
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
