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
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Create New Task
              </h2>
            </div>
            <Suspense fallback={<div className="p-4">Loading form...</div>}>
              <TaskForm />
            </Suspense>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Tasks
              </h2>
            </div>
            <div className="p-4">
              <Suspense fallback={<div>Loading tasks...</div>}>
                <TaskList tasks={serializedTasks} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
