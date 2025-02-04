# Task Management Application

A simple task management application built with Next.js and MongoDB, featuring server actions for handling task operations.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete or incomplete
- Persistent storage with MongoDB
- Server-side data handling with Next.js Server Actions
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js 18 or later
- MongoDB installed locally or a MongoDB Atlas account
- npm or yarn package manager

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your MongoDB connection string:

```
MONGODB_URI=mongodb://localhost:27017/task-manager
```

Note: Replace the connection string with your MongoDB Atlas URI if you're using a cloud database.

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/app` - Contains the application routes and pages
- `/src/components` - Reusable UI components
- `/src/lib` - Utility functions and database connection
- `/src/models` - MongoDB models
- `/src/app/actions` - Server actions for handling tasks

## Technologies Used

- Next.js 14
- MongoDB & Mongoose
- Tailwind CSS
- date-fns for date handling

## Development

The application uses Next.js Server Actions for all data operations. The main server actions are located in `/src/app/actions/taskActions.js`:

- `createTask` - Create a new task
- `getTasks` - Retrieve all tasks
- `updateTask` - Update an existing task
- `deleteTask` - Delete a task
- `toggleTaskStatus` - Toggle task completion status

## Contributing

Feel free to submit issues and enhancement requests.
