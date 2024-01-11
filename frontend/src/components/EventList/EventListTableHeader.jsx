import TableHeader from "../TableHeader";

const EventListTableHeader = () => {
  return (
    <TableHeader
      headers={[
        "event_id",
        "title",
        "details",
        "type",
        "date",
        "status",
        "task_id",
      ]}
    />
  );
};

export default EventListTableHeader;
