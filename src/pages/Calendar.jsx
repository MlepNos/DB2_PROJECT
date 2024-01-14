import Calendar from "../components/Calendar/Calendar.jsx";
import { ExecuteStoredProcedureButton } from "../components/SP/ExecuteStoredProcedureButton.jsx";
import { CalendarProvider } from "../context/CalendarContext.jsx";

const Cal = ({ events }) => {
  return (
    <CalendarProvider>
      <Calendar events={events}></Calendar>
    </CalendarProvider>
  );
};

export default Cal;
