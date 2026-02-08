import type { FC } from 'react'

import { TASK_STATUSES } from '../types/task'
import type { TaskFilterStatus } from '../store/taskStore'

type Props = {
  value: TaskFilterStatus
  onChange: (value: TaskFilterStatus) => void
}

export const TaskFilter: FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-slate-600">Filter</label>
      <select
        className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value as TaskFilterStatus)}
      >
        <option value="All">All</option>
        {TASK_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  )
}
