import AuditTrailTableData from "./AuditTrailTableData.jsx";

import React, { useState } from "react";

const style = {
  position: "absolute",
  top: "35vh",
  left: "85vh",
  transform: "translate(-30vh, -30vh)",
  maxWidth: "100vh",
  minWidth: "80vh",
  width: "auto",
  bgcolor: "background.paper",
  borderRadius: "2vh",
  p: "3vh",
};
const AuditTrailListTableBody = ({ trails }) => {
  return (
    <tbody>
      {trails?.map((trail) => (
        <tr key={trail?.AuditTrailID}>
          <AuditTrailTableData trail={trail}></AuditTrailTableData>
          <td>
            <div className="MeaList-icon-container"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default AuditTrailListTableBody;
