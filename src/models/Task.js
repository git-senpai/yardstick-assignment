import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  dueDate: {
    type: Date,
    required: [true, "Due date is required"],
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
taskSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
