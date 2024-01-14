import { TaskContext } from "../context/TaskContext";
import { useContext } from "react";

export const useTasksContext = () => {
  const context = useContext(TaskContext); //context has now dispatch and state properties

  if (!context) {
    throw Error("useEventsContext must be used inside an EventContextProvider");
  }

  return context;
};
