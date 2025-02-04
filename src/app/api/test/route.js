import { NextResponse } from "next/server";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "@/app/actions/taskActions";

export async function GET() {
  try {
    console.log("Starting backend functionality tests...");
    const results = [];

    // Test 1: Create a new task
    console.log("\nTest 1: Creating a new task...");
    const formData = new FormData();
    formData.append("title", "Test Task");
    formData.append("description", "This is a test task");
    formData.append("dueDate", new Date().toISOString());

    const createResult = await createTask(formData);
    results.push({ test: "Create Task", result: createResult });
    console.log("Create Task Result:", createResult);

    if (!createResult.success) {
      throw new Error("Failed to create task");
    }

    const taskId = createResult.data._id;

    // Test 2: Get all tasks
    console.log("\nTest 2: Getting all tasks...");
    const getResult = await getTasks();
    results.push({ test: "Get Tasks", result: getResult });
    console.log("Get Tasks Result:", getResult);

    // Test 3: Update task
    console.log("\nTest 3: Updating task...");
    const updates = {
      title: "Updated Test Task",
      description: "This task has been updated",
      dueDate: new Date(),
    };
    const updateResult = await updateTask(taskId, updates);
    results.push({ test: "Update Task", result: updateResult });
    console.log("Update Task Result:", updateResult);

    // Test 4: Toggle task status
    console.log("\nTest 4: Toggling task status...");
    const toggleResult = await toggleTaskStatus(taskId);
    results.push({ test: "Toggle Status", result: toggleResult });
    console.log("Toggle Status Result:", toggleResult);

    // Test 5: Delete task
    console.log("\nTest 5: Deleting task...");
    const deleteResult = await deleteTask(taskId);
    results.push({ test: "Delete Task", result: deleteResult });
    console.log("Delete Task Result:", deleteResult);

    return NextResponse.json({
      success: true,
      message: "All tests completed",
      results,
    });
  } catch (error) {
    console.error("Test failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
