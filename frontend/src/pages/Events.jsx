import ExampleComponent from "../components/ExampleComponent";

const Events = ({ events }) => {
  return (
    <div className="home">
      <div className="meals">
        {events &&
          events.map((event, i) => (
            <ExampleComponent key={event._id} event={event} digit={i++} />
          ))}
      </div>
    </div>
  );
};

export default Events;
