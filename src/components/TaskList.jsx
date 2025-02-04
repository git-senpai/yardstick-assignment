"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function TaskList({ tasks, onUpdate }) {
  const [filter, setFilter] = useState("all"); // all, pending, completed

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === "all"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Tasks
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Pending
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === "completed"
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Completed
          </motion.button>
        </div>
        <motion.p layout className="text-sm text-gray-500 font-medium">
          {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {filteredTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-sm">No tasks found</p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 sm:gap-6 grid-cols-1"
          >
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task) => (
                <TaskCard key={task._id} task={task} onUpdate={onUpdate} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
