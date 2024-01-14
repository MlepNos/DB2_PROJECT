import React from "react";

const EventTableData = ({ event }) => {
  const inputDateString = event?.date;
  const inputDate = new Date(inputDateString);

  const formattedDate = inputDate.toLocaleDateString("en-GB"); // 'en-GB' for day/month/year format
  return (
    <>
      <td>{event?.event_id}</td>
      <td>{event?.title}</td>
      <td>{event?.details}</td>
      <td>{event?.types_id}</td>
      <td>{formattedDate}</td>
      <td>{event?.status}</td>
    </>
  );
};

export default EventTableData;
