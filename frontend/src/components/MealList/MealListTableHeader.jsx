import TableHeader from "../TableHeader";

const MealListTableHeader = () => {
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

export default MealListTableHeader;
