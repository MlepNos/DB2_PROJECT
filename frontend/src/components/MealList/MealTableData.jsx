import React from "react";

const MealTableData = ({ event }) => {
  return (
    <>
      <td>{event?.event_id}</td>
      <td>{event?.title}</td>
      <td>{event?.details}</td>
      <td>{event?.type}</td>
      <td>{event?.date}</td>
      <td>{event?.status}</td>
    </>
  );
};

export default MealTableData;
