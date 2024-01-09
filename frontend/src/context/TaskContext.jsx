import { createContext, useState } from "react";
import dayjs from "dayjs";
import { useTaskDispatchContext } from "../hooks/useTaskDispatchContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { dispatch } = useTaskDispatchContext();
  const emptyTask = {
    task_name: "",
    task: "",
    date: dayjs(),
  };
  const [task, setTask] = useState(emptyTask);

  const addTask = async (task) => {
    console.log("task", task);
    const response = await fetch("/api/task", {
      method: "POST",
      body: JSON.stringify({
        task_name: task.name,
        task: task.details,
        date: task.date,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "CREATE_TASK", payload: json });
    }
  };

  const contextValue = {
    addTask,
    task,
    setTask,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
