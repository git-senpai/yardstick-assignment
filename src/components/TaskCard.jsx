"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { formatDate } from "@/lib/utils";
import { deleteTask, toggleTaskStatus } from "@/app/actions/taskActions";
import TaskForm from "./TaskForm";

export default function TaskCard({ task, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);
      const result = await deleteTask(task._id);
      if (!result.success) {
        throw new Error(result.error);
      }
      onUpdate?.();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      setShowDeleteDialog(false);
    }
  }

  async function handleToggleStatus() {
    try {
      setLoading(true);
      const result = await toggleTaskStatus(task._id);
      if (!result.success) {
        throw new Error(result.error);
      }
      onUpdate?.();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <TaskForm
          task={task}
          onSuccess={() => {
            setIsEditing(false);
            onUpdate?.();
          }}
          onCancel={() => setIsEditing(false)}
        />
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.02 }}
        className="task-card glass-effect rounded-xl p-6"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <motion.h3
              layout="position"
              className="text-lg font-semibold text-gray-900 flex items-center gap-3"
            >
              <span>{task.title}</span>
              <motion.span
                layout
                className={`status-badge ${
                  task.status === "completed"
                    ? "status-badge-completed"
                    : "status-badge-pending"
                }`}
              >
                {task.status}
              </motion.span>
            </motion.h3>
            <motion.p layout="position" className="mt-2 text-sm text-gray-600">
              {task.description}
            </motion.p>
            <motion.p
              layout="position"
              className="mt-3 text-xs font-medium text-gray-500"
            >
              Due: {formatDate(task.dueDate)}
            </motion.p>
          </div>

          <div className="flex items-center space-x-3 ml-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleStatus}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-emerald-500 disabled:opacity-50 transition-colors"
              title={
                task.status === "completed"
                  ? "Mark as pending"
                  : "Mark as completed"
              }
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-purple-500 disabled:opacity-50 transition-colors"
              title="Edit task"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDeleteDialog(true)}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-pink-500 disabled:opacity-50 transition-colors"
              title="Delete task"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDeleteDialog && (
          <Dialog
            static
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            open={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
            className="relative z-50"
          >
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              aria-hidden="true"
            />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel
                as={motion.div}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="mx-auto max-w-sm rounded-xl glass-effect p-6"
              >
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  Delete Task
                </Dialog.Title>
                <Dialog.Description className="mt-3 text-sm text-gray-500">
                  Are you sure you want to delete "{task.title}"? This action
                  cannot be undone.
                </Dialog.Description>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white/90 border border-gray-300 rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    onClick={() => setShowDeleteDialog(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg hover:from-pink-600 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
