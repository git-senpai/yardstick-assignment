"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Task from "@/models/Task";
import {
  createErrorResponse,
  createSuccessResponse,
  validateTaskInput,
} from "@/lib/utils";
import { API_MESSAGES } from "@/lib/config";
import { TaskStatus } from "@/types/task";

// Helper function to safely convert date to ISO string
function safeToISOString(date) {
  if (!date) return null;
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime()) ? dateObj.toISOString() : null;
}

// Helper function to serialize task data
function serializeTask(task) {
  if (!task) return null;

  return {
    _id: task._id?.toString(),
    title: task.title,
    description: task.description,
    dueDate: safeToISOString(task.dueDate),
    status: task.status,
    createdAt: safeToISOString(task.createdAt),
    updatedAt: safeToISOString(task.updatedAt),
  };
}

export async function createTask(formData) {
  try {
    const dueDate = new Date(formData.get("dueDate"));
    if (isNaN(dueDate.getTime())) {
      return createErrorResponse("Invalid due date format", 400);
    }

    const taskData = {
      title: formData.get("title"),
      description: formData.get("description"),
      dueDate,
    };

    const validation = validateTaskInput(taskData);
    if (!validation.isValid) {
      return createErrorResponse(validation.errors.join(", "), 400);
    }

    await connectDB();
    const task = await Task.create(taskData);

    revalidatePath("/");
    return createSuccessResponse(
      serializeTask(task),
      API_MESSAGES.SUCCESS.TASK_CREATED
    );
  } catch (error) {
    return createErrorResponse(error.message);
  }
}

export async function getTasks() {
  try {
    await connectDB();
    const tasks = await Task.find().sort({ createdAt: -1 });
    const serializedTasks = tasks
      .map((task) => serializeTask(task))
      .filter(Boolean);
    return createSuccessResponse(serializedTasks);
  } catch (error) {
    return createErrorResponse(error.message);
  }
}

export async function updateTask(taskId, updates) {
  try {
    if (updates.dueDate) {
      const dueDate = new Date(updates.dueDate);
      if (isNaN(dueDate.getTime())) {
        return createErrorResponse("Invalid due date format", 400);
      }
      updates.dueDate = dueDate;
    }

    const validation = validateTaskInput({ ...updates });
    if (!validation.isValid) {
      return createErrorResponse(validation.errors.join(", "), 400);
    }

    await connectDB();
    const task = await Task.findByIdAndUpdate(
      taskId,
      { ...updates },
      { new: true, runValidators: true }
    );

    if (!task) {
      return createErrorResponse(API_MESSAGES.ERROR.TASK_NOT_FOUND, 404);
    }

    revalidatePath("/");
    return createSuccessResponse(
      serializeTask(task),
      API_MESSAGES.SUCCESS.TASK_UPDATED
    );
  } catch (error) {
    return createErrorResponse(error.message);
  }
}

export async function deleteTask(taskId) {
  try {
    await connectDB();
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return createErrorResponse(API_MESSAGES.ERROR.TASK_NOT_FOUND, 404);
    }

    revalidatePath("/");
    return createSuccessResponse(
      serializeTask(task),
      API_MESSAGES.SUCCESS.TASK_DELETED
    );
  } catch (error) {
    return createErrorResponse(error.message);
  }
}

export async function toggleTaskStatus(taskId) {
  try {
    await connectDB();
    const task = await Task.findById(taskId);

    if (!task) {
      return createErrorResponse(API_MESSAGES.ERROR.TASK_NOT_FOUND, 404);
    }

    task.status =
      task.status === TaskStatus.PENDING
        ? TaskStatus.COMPLETED
        : TaskStatus.PENDING;
    await task.save();

    revalidatePath("/");
    return createSuccessResponse(
      serializeTask(task),
      API_MESSAGES.SUCCESS.STATUS_UPDATED
    );
  } catch (error) {
    return createErrorResponse(error.message);
  }
}
