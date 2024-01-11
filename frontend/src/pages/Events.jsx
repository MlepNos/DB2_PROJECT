import ExampleComponent from "../components/ExampleComponent";
import EventList from "../components/EventList/EventList";
import { EventListProvider } from "../context/EventListContext";

const Events = ({ events }) => {
  return (
    <div className="home">
      <div className="meals">
        <EventListProvider>
          <EventList events={events}></EventList>
        </EventListProvider>
      </div>
    </div>
  );
};

export default Events;
