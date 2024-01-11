import { createContext, useState } from "react";
import dayjs from "dayjs";
import { useTaskDispatchContext } from "../hooks/useTaskDispatchContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { dispatch, tasks } = useTaskDispatchContext();
  const emptyTask = {
    task_name: "",
    task: "",
    date: dayjs(),
  };
  const [task, setTasks] = useState(tasks);

  const addTask = async (task) => {
    console.log("task", task);
    const response = await fetch("/api/task", {
      method: "POST",
      body: JSON.stringify({
        task_name: task.task_name,
        task: task.task,
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

  const deleteTask = async (id) => {
    const response = await fetch("/api/task/" + id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_EVENT", payload: json });
    }
  };

  const contextValue = {
    addTask,

    deleteTask,
    tasks,
    task,
    setTasks,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
