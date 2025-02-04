import { getTasks } from "./actions/taskActions";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { Suspense } from "react";

// Helper function to safely convert date to ISO string
function safeToISOString(date) {
  if (!date) return null;
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime()) ? dateObj.toISOString() : null;
}

export default async function Home() {
  const { data: tasks = [] } = await getTasks();

  // Serialize the MongoDB documents to plain objects
  const serializedTasks = tasks.map((task) => ({
    _id: task._id.toString(),
    title: task.title,
    description: task.description,
    dueDate: safeToISOString(task.dueDate),
    status: task.status,
    createdAt: safeToISOString(task.createdAt),
    updatedAt: safeToISOString(task.updatedAt),
  }));

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Task Manager
          </h1>
          <p className="text-white/80 text-lg">
            Organize your tasks efficiently
          </p>
        </div>

        <div className="space-y-8">
          <div className="glass-effect rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-gray-900">
                Create New Task
              </h2>
            </div>
            <Suspense
              fallback={
                <div className="p-6 text-center text-gray-500">
                  Loading form...
                </div>
              }
            >
              <TaskForm />
            </Suspense>
          </div>

          <div className="glass-effect rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Tasks
              </h2>
            </div>
            <div className="p-6">
              <Suspense
                fallback={
                  <div className="text-center text-gray-500">
                    Loading tasks...
                  </div>
                }
              >
                <TaskList tasks={serializedTasks} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
