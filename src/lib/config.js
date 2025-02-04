export const DB_CONFIG = {
  MONGODB_URI: process.env.MONGODB_URI,
  OPTIONS: {
    bufferCommands: false,
  },
};

export const VALIDATION_RULES = {
  TITLE: {
    MAX_LENGTH: 100,
    MIN_LENGTH: 1,
  },
  DESCRIPTION: {
    MAX_LENGTH: 500,
    MIN_LENGTH: 1,
  },
};

export const API_MESSAGES = {
  SUCCESS: {
    TASK_CREATED: "Task created successfully",
    TASK_UPDATED: "Task updated successfully",
    TASK_DELETED: "Task deleted successfully",
    STATUS_UPDATED: "Task status updated successfully",
  },
  ERROR: {
    TASK_NOT_FOUND: "Task not found",
    INVALID_INPUT: "Invalid input data",
    DATABASE_ERROR: "Database operation failed",
    REQUIRED_FIELDS: "Please fill in all required fields",
    INVALID_DATE: "Invalid due date",
  },
};
