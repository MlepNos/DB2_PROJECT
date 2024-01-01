import Calendar from "../components/Calendar/Calendar.jsx";
import { ExecuteStoredProcedureButton } from "../components/Modal/EventModal/ExecuteStoredProcedureButton.jsx";
import { CalendarProvider } from "../context/CalendarContext.jsx";

const Cal = ({ events }) => {
  return (
    <CalendarProvider>
      <Calendar events={events}></Calendar>
      <ExecuteStoredProcedureButton></ExecuteStoredProcedureButton>
    </CalendarProvider>
  );
};

export default Cal;
