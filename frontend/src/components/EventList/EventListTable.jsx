import EventListTableHeader from "./EventListTableHeader";
import EventListTableBody from "./EventListTableBody";

const EventListTable = ({ events }) => {
  return (
    <div className="table-con">
      <table className="table">
        <EventListTableHeader />
        <EventListTableBody events={events} />
      </table>
    </div>
  );
};

export default EventListTable;
