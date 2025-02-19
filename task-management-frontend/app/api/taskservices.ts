import { api } from "../../lib/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createTask = async (
  title: string,
  description: string,
  dueDate: string
) => {
  return api.post(
    "/tasks",
    { title, description, dueDate },
    { headers: getAuthHeaders() }
  );
};

export const getTasks = async () => {
  return api.get("/tasks", { headers: getAuthHeaders() });
};

export const updateTask = async (
  id: string,
  updates: {
    title?: string;
    description?: string;
    dueDate?: string;
    status?: string;
  }
) => {
  return api.put(`/tasks/${id}`, updates, { headers: getAuthHeaders() });
};

export const deleteTask = async (id: string) => {
  return api.delete(`/tasks/${id}`, { headers: getAuthHeaders() });
};
