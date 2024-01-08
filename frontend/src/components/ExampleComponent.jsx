const ExampleComponent = ({ event, key, digit }) => {
  return (
    <div>
      <h1>
        Example Employee {digit}: {event.title} {event.status}
      </h1>
    </div>
  );
};

export default ExampleComponent;
