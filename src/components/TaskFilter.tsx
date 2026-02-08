import type { FC } from 'react'

import { TASK_STATUSES, TASK_STATUS_LABEL, type TaskStatus } from '../types/task'
import type { TaskFilterStatus } from '../store/taskStore'

type Props = {
  value: TaskFilterStatus
  onChange: (value: TaskFilterStatus) => void
}

const options: TaskFilterStatus[] = ['All', ...TASK_STATUSES]

const statusStyles: Record<TaskFilterStatus, string> = {
  All: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  TODO: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  IN_PROGRESS: 'bg-amber-100 text-amber-900 hover:bg-amber-200',
  DONE: 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200',
}

const activeStyles: Record<TaskFilterStatus, string> = {
  All: 'bg-slate-900 text-white hover:bg-slate-800',
  TODO: 'bg-slate-600 text-white hover:bg-slate-500',
  IN_PROGRESS: 'bg-amber-600 text-white hover:bg-amber-500',
  DONE: 'bg-emerald-600 text-white hover:bg-emerald-700',
}

const labelOf = (value: TaskFilterStatus) => {
  if (value === 'All') return 'All'
  return TASK_STATUS_LABEL[value as TaskStatus]
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
          {labelOf(opt)}
        </button>
      ))}
    </div>
  )
}
