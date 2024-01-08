import { BasicModal } from "../BasicModal";

import TextField from "@mui/material/TextField";
import { useEventsContext } from "../../../hooks/useEventsContext";
import { useState } from "react";
import dayjs from "dayjs";
import { useEffect } from "react";
import StyledButton from "../../Styled_MUI_Components/StyledButton";
import StyledDateField from "../../Styled_MUI_Components/StyledDateField";

export const EventListModal = ({ isOpen, setIsOpen }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState(dayjs());
  const [status, setStatus] = useState("");
  const { dispatch } = useEventsContext();
  /*
  useEffect(() => {
    // Update the date when 'dates' prop changes
    setDate(dayjs(dates));
  }, [dates]);*/

  const addEvent = async () => {
    const response = await fetch("/api/", {
      method: "POST",
      body: JSON.stringify({
        event_id: Math.floor(Math.random() * 10000),
        title: title,
        details: details,
        type: type,
        date: date,
        status: status,
        task_id: Math.floor(Math.random() * 10000),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "CREATE_EVENT", payload: json });
      setIsOpen(!isOpen);
    }
  };

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const formattedTime = new Intl.DateTimeFormat("de-DE", options).format(
    new Date(date)
  );
  return (
    <BasicModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1 className="Modal-Header">Neues Event</h1>
      <div className="EventModal-Content">
        <div className="EventModal-Container">
          <StyledDateField
            label="Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
          ></StyledDateField>
          <TextField
            id="standard-basic"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></TextField>
          <TextField
            id="standard-basic"
            label="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></TextField>
          <TextField
            id="standard-basic"
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          ></TextField>
          <TextField
            id="standard-basic"
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          ></TextField>
        </div>

        <StyledButton variant="contained" onClick={addEvent}>
          Event hinzufugen
        </StyledButton>
      </div>
    </BasicModal>
  );
};
