/**
 * @typedef {Object} Task
 * @property {string} _id - MongoDB document ID
 * @property {string} title - Task title
 * @property {string} description - Task description
 * @property {Date} dueDate - Task due date
 * @property {('pending'|'completed')} status - Task status
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the operation was successful
 * @property {Task|Task[]|null} data - The response data
 * @property {string|null} error - Error message if operation failed
 */

export const TaskStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
};

/**
 * @type {Object.<string, string>}
 */
export const ErrorMessages = {
  TASK_NOT_FOUND: "Task not found",
  INVALID_INPUT: "Invalid input data",
  DATABASE_ERROR: "Database operation failed",
  REQUIRED_FIELDS: "Please fill in all required fields",
};
