import { useState } from "react";
import { nanoid } from "nanoid";

export interface Task {
  id: string;
  title: string;
}

const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const completeTask = (id: string): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>): void => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...taskUpdate } : task
    );
    setTasks(newTasks);
  };

  const addTask = (title: string): void => {
    if (title.trim() === "") {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const filterTasks = (searchKeyword: string): Task[] => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  };

  return {
    tasks,
    completeTask,
    updateTask,
    addTask,
    filterTasks,
  };
};

export default useTaskManager;
