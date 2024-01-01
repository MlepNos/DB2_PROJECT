import { BasicModal } from "../BasicModal";
import { DateField } from "@mui/x-date-pickers/DateField";
import TextField from "@mui/material/TextField";
import { useEventsContext } from "../../../hooks/useEventsContext";
import { useState } from "react";
import dayjs from "dayjs";

import StyledButton from "../../Styled_MUI_Components/StyledButton";
import StyledDateField from "../../Styled_MUI_Components/StyledDateField";

export const EventModal = ({ isOpen, setIsOpen }) => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [date, setDate] = useState(dayjs());
  const { dispatch } = useEventsContext();

  const addEvent = async () => {
    const response = await fetch("/api/", {
      method: "POST",
      body: JSON.stringify({
        emp_id: Math.floor(Math.random() * 10000),
        first_name: first_name,
        last_name: last_name,
        date: date.format("DD.MM.YYYY"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      setFirst_name("");
      setLast_name("");
      dispatch({ type: "CREATE_EVENT", payload: json });
      setIsOpen(!isOpen);
      console.log(date.format("DD.MM.YYYY"));
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
      <StyledDateField
        label="Date"
        value={date}
        onChange={(newDate) => setDate(newDate.format("DD.MM.YYYY"))}
      ></StyledDateField>
      <TextField
        id="standard-basic"
        label="First Name"
        value={first_name}
        onChange={(e) => setFirst_name(e.target.value)}
      ></TextField>
      <TextField
        id="standard-basic"
        label="Last Name"
        value={last_name}
        onChange={(e) => setLast_name(e.target.value)}
      ></TextField>

      <StyledButton variant="contained" onClick={addEvent}>
        Event hinzufugen
      </StyledButton>
    </BasicModal>
  );
};
