import "./AuditTrailList.css";
import AuditTrailListTable from "./AuditTrailListTable.jsx";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

import { useState } from "react";

const StyledEventButton = styled(Button)({
  fontFamily: "Segoe UI",
  fontWeight: 400,
  color: "white",
  backgroundColor: "#043c5f",
  width: "auto",
  borderRadius: "1vh",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(3, 40, 63, 1)",
  },
});

function AuditTrailList({ trails }) {
  console.log("trails: ", trails);
  return (
    <div className="MealList-App-Container">
      <AuditTrailListTable trails={trails} />
    </div>
  );
}

export default AuditTrailList;
