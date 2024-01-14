import { BasicModal } from "../BasicModal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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
        date: date,
        status: status,
        types_id: type,
        //task_id: Math.floor(Math.random() * 10000),
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
          <div className="EventModal-Fields">
            <StyledDateField
              className="EventModal-Fields textfield"
              label="Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
            ></StyledDateField>
            <TextField
              className="EventModal-Fields textfield"
              id="standard-basic"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              multiline
            ></TextField>
            <TextField
              className="EventModal-Fields textfield"
              id="standard-basic"
              label="Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              multiline
            ></TextField>
            <Select
              className="EventModal-Fields textfield"
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select>
            <TextField
              id="standard-basic"
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              multiline
            ></TextField>
          </div>
        </div>

        <button className="EventModal-Button" onClick={addEvent}>
          Event hinzufugen
        </button>
      </div>
    </BasicModal>
  );
};
