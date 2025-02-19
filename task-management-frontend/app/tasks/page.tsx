"use client";

import { useState, useEffect, useRef } from "react";
import { useTaskStore } from "../store/useTaskStore";
import TaskList, { TaskListRef } from "./TaskList";
import Loader from "./Loader";

export default function TaskPage() {
  const { tasks, fetchTasks, addTask, editTask, removeTask } = useTaskStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const taskListRef = useRef<TaskListRef>(null); // Ref for TaskList

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && dueDate) {
      await addTask(title, description, dueDate);
      setTitle("");
      setDescription("");
      setDueDate("");
      taskListRef.current?.fetchTasks();

      await fetchTasks();
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Loader />
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      {/* Create Task Form */}
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Task
        </button>
      </form>

      <TaskList ref={taskListRef} />
    </div>
  );
}
