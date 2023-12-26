const ExampleComponent = ({ event, key, digit }) => {
  return (
    <div>
      <h1>
        Example Employee {digit}: {event.first_name} {event.last_name}
      </h1>
    </div>
  );
};

export default ExampleComponent;
