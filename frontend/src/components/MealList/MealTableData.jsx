import React from "react";

const MealTableData = ({ event }) => {
  const inputDateString = event?.date;
  const inputDate = new Date(inputDateString);

  const formattedDate = inputDate.toLocaleDateString("en-GB"); // 'en-GB' for day/month/year format
  console.log(formattedDate);
  return (
    <>
      <td>{event?.event_id}</td>
      <td>{event?.title}</td>
      <td>{event?.details}</td>
      <td>{event?.types_name}</td>
      <td>{formattedDate}</td>
      <td>{event?.status}</td>
    </>
  );
};

export default MealTableData;
