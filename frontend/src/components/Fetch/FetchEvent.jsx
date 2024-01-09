import { useEffect } from "react";
import { useEventsContext } from "../../hooks/useEventsContext.js";
import Cal from "../../pages/Calendar.jsx";
import { Routes, Route } from "react-router-dom";
import Events from "../../pages/Events.jsx";
import ToDoPage from "../../pages/ToDo.jsx";
function FetchEvent() {
  const { events, dispatch } = useEventsContext();

  useEffect(() => {
    try {
      const fetchEvent = async () => {
        const response = await fetch("/api/");
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_EVENT", payload: json });
        }
      };

      fetchEvent();
    } catch (error) {
      console.log("Error:", error);
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/Calendar" element={<Cal events={events} />} />
      <Route path="/Events" element={<Events events={events} />} />
      <Route path="/ToDo" element={<ToDoPage />} />
    </Routes>
  );
}

export default FetchEvent;
