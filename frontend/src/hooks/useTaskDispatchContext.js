import { TaskDispatchContext } from "../context/TaskDispatchContext";
import { useContext } from "react";

export const useTaskDispatchContext = () => {
  const context = useContext(TaskDispatchContext); //context has now dispatch and state properties

  if (!context) {
    throw Error("useEventsContext must be used inside an EventContextProvider");
  }

  return context;
};
