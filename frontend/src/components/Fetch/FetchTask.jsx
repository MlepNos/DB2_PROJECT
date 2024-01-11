import { useEffect } from "react";

import Cal from "../../pages/Calendar.jsx";
import { Routes, Route } from "react-router-dom";
import Events from "../../pages/Events.jsx";
import ToDoPage from "../../pages/ToDo.jsx";
import { useTaskDispatchContext } from "../../hooks/useTaskDispatchContext.js";
function FetchTask() {
  const { tasks, dispatch } = useTaskDispatchContext();

  useEffect(() => {
    try {
      const fetchTask = async () => {
        const response = await fetch("/api/task");
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_TASK", payload: json });
        }
      };

      fetchTask();
    } catch (error) {
      console.log("Error:", error);
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/ToDo" element={<ToDoPage tasks={tasks} />} />
    </Routes>
  );
}

export default FetchTask;
