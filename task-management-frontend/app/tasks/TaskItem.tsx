import React, { useState } from "react";
import { deleteTask, updateTask } from "../api/taskservices";
import { Task } from "../store/useTaskStore";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleDelete = async () => {
    console.log({ task });
    try {
      await deleteTask(task._id ?? "");
      onDelete(task._id ?? "");
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleStatusChange = async () => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      await updateTask(task._id ?? "", { status: newStatus });
      onUpdate(task._id ?? "", { status: newStatus });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedTask(task);
  };

  const handleSave = async () => {
    try {
      await updateTask(task._id ?? "", editedTask);
      onUpdate(task._id ?? "", editedTask);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <div className="border p-4 rounded shadow-md flex justify-between items-center">
      {isEditing ? (
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={editedTask.dueDate}
            onChange={(e) =>
              setEditedTask({ ...editedTask, dueDate: e.target.value })
            }
            className="border p-2 rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={handleEditToggle}
              className="px-3 py-1 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between w-full">
          <div>
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p className="text-sm">{task.description}</p>
            <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleStatusChange}
              className={`px-3 py-1 text-white rounded ${
                task.status === "completed" ? "bg-green-500" : "bg-yellow-500"
              }`}
            >
              {task.status === "completed" ? "Mark Pending" : "Complete"}
            </button>
            <button
              onClick={handleEditToggle}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
