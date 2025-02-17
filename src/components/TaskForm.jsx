"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createTask, updateTask } from "@/app/actions/taskActions";
import toast from "react-hot-toast";

export default function TaskForm({ task, onSuccess, onCancel }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData) {
    try {
      setLoading(true);
      setError("");

      const result = task
        ? await updateTask(task._id, {
            title: formData.get("title"),
            description: formData.get("description"),
            dueDate: formData.get("dueDate"),
          })
        : await createTask(formData);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success(
        task ? "Task updated successfully" : "Task created successfully"
      );
      onSuccess?.();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-6"
    >
      <form action={handleSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 text-sm text-pink-500 bg-pink-50 rounded-lg border border-pink-200"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={task?.title}
              required
              maxLength={100}
              className="form-input"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              defaultValue={task?.description}
              required
              maxLength={500}
              rows={3}
              className="form-input"
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Due Date
            </label>
            <input
              type="datetime-local"
              name="dueDate"
              id="dueDate"
              defaultValue={
                task?.dueDate
                  ? new Date(task.dueDate).toISOString().slice(0, 16)
                  : ""
              }
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
          {onCancel && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-gray-700 bg-white/90 border border-gray-300 rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Cancel
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto btn-primary disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              <span>{task ? "Update Task" : "Create Task"}</span>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
