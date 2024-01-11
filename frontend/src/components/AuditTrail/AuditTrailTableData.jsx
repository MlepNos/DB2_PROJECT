import React from "react";

const AuditTrailTableData = ({ trail }) => {
  const inputDateString = trail?.Timestamp;
  const inputDate = new Date(inputDateString);

  const formattedDate = inputDate.toLocaleDateString("en-GB"); // 'en-GB' for day/month/year format
  return (
    <>
      <td>{trail?.AuditTrailID}</td>
      <td>{trail?.TableName}</td>
      <td>{trail?.Action}</td>
      <td>{formattedDate}</td>
      <td>{trail?.OldValues}</td>
      <td>{trail?.NewValues}</td>
    </>
  );
};

export default AuditTrailTableData;
