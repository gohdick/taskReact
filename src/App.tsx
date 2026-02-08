import { useEffect } from "react";
import { Toaster } from "sonner";

import { TaskFilter } from "./components/TaskFilter";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { useTaskStore } from "./store/taskStore";

const App = () => {
  const tasks = useTaskStore((s) => s.tasks);
  const filterStatus = useTaskStore((s) => s.filterStatus);
  const isLoading = useTaskStore((s) => s.isLoading);
  const error = useTaskStore((s) => s.error);

  const setFilterStatus = useTaskStore((s) => s.setFilterStatus);
  const fetchTasks = useTaskStore((s) => s.fetchTasks);
  const createTask = useTaskStore((s) => s.createTask);
  const updateTask = useTaskStore((s) => s.updateTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Task Manager
            </h1>
          </div>

          <TaskFilter value={filterStatus} onChange={setFilterStatus} />
        </div>

        <div className="mt-6">
          <TaskForm
            isLoading={isLoading}
            onCreate={(input) => void createTask(input)}
          />
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium text-slate-900">Tasks</h2>
            <button
              type="button"
              className="text-sm text-slate-600 hover:text-slate-900"
              onClick={() => void fetchTasks()}
              disabled={isLoading}
            >
              {isLoading ? "Loading…" : "Refresh"}
            </button>
          </div>

          <TaskList
            tasks={tasks}
            onStatusChange={(id, status) => void updateTask(id, { status })}
            onDelete={(id) => void deleteTask(id)}
          />
          <Toaster
            richColors
            position="bottom-right"
            toastOptions={{
              duration: 3000,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
