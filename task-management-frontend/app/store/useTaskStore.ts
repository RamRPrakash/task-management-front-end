import { create } from "zustand";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../api/taskservices";

export interface Task {
  id?: string;
  _id?: string;
  title?: string;
  description?: string;
  dueDate?: string;
  status?: string;
}

interface TaskStore {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (
    title: string,
    description: string,
    dueDate: string
  ) => Promise<void>;
  editTask: (id: string, updates: Partial<Task>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  fetchTasks: async () => {
    try {
      const { data } = await getTasks();
      set({ tasks: data });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  },

  addTask: async (title, description, dueDate) => {
    try {
      await createTask(title, description, dueDate);
      set((state) => ({
        tasks: [
          ...state.tasks,
          {
            title,
            description,
            dueDate,
            status: "pending",
            _id: Date.now().toString(),
          },
        ],
      }));
    } catch (error) {
      console.error("Error adding task:", error);
    }
  },

  editTask: async (id, updates) => {
    try {
      await updateTask(id, updates);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === id ? { ...task, ...updates } : task
        ),
      }));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  },

  removeTask: async (id) => {
    try {
      await deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  },
}));
