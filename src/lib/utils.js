import { API_MESSAGES } from "./config";

/**
 * Creates a standardized error response
 * @param {string} message - Error message
 * @param {number} [statusCode=500] - HTTP status code
 * @returns {Object} Error response object
 */
export function createErrorResponse(message, statusCode = 500) {
  return {
    success: false,
    error: message || API_MESSAGES.ERROR.DATABASE_ERROR,
    statusCode,
  };
}

/**
 * Creates a standardized success response
 * @param {*} data - Response data
 * @param {string} [message] - Success message
 * @returns {Object} Success response object
 */
export function createSuccessResponse(data, message) {
  return {
    success: true,
    data,
    message,
  };
}

/**
 * Validates task input data
 * @param {Object} taskData - Task input data
 * @returns {Object} Validation result
 */
export function validateTaskInput(taskData) {
  const errors = [];

  if (!taskData.title?.trim()) {
    errors.push("Title is required");
  }

  if (!taskData.description?.trim()) {
    errors.push("Description is required");
  }

  if (!taskData.dueDate) {
    errors.push("Due date is required");
  } else {
    const dueDate = new Date(taskData.dueDate);
    if (isNaN(dueDate.getTime())) {
      errors.push("Invalid due date format");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Formats a date to a readable string
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
