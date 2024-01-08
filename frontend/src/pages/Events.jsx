import ExampleComponent from "../components/ExampleComponent";
import MealList from "../components/MealList/MealList";
import { EventListProvider } from "../context/EventListContext";

const Events = ({ events }) => {
  return (
    <div className="home">
      <div className="meals">
        <EventListProvider>
          <MealList events={events}></MealList>
        </EventListProvider>
      </div>
    </div>
  );
};

export default Events;
