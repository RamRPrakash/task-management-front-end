import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import TaskItem from "./TaskItem";
import { Task } from "../store/useTaskStore";
import { getTasks } from "../api/taskservices";
import { useLoadingStore } from "../store/useLoadingStore";
import Loader from "./Loader";

export interface TaskListRef {
  fetchTasks: () => void;
}

const TaskList = forwardRef<TaskListRef>((_, ref) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { setLoading } = useLoadingStore();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      true;
      const response = await getTasks();
      console.log({ response });
      setTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchTasks, // Expose fetchTasks to parent component
  }));

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    await fetchTasks(); // Refresh task list after deletion
  };

  const handleUpdate = async (id: string, updates: Partial<Task>) => {
    await fetchTasks(); // Refresh task list after update
  };

  return (
    <div className="p-6">
      <Loader />
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <div className="grid gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
});

export default TaskList;
