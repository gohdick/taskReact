import type { FC } from 'react'

import type { Task, TaskStatus } from '../types/task'
import { TaskCard } from './TaskCard'

type Props = {
  tasks: Task[]
  onStatusChange: (id: number, status: TaskStatus) => void
  onDelete: (id: number) => void
}

export const TaskList: FC<Props> = ({ tasks, onStatusChange, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
        No tasks
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} onStatusChange={onStatusChange} onDelete={onDelete} />
      ))}
    </div>
  )
}
