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
import { useEventListContext } from "../../../hooks/useEventListContext";
import EventInputElement from "./EventInputElement";
export const EventListUpdateModal = ({ isOpen, setIsOpen }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const [date, setDate] = useState(dayjs());
  const [status, setStatus] = useState("");
  const { dispatch } = useEventsContext();

  const { event, setEvent, submitEvent } = useEventListContext();
  console.log(event.date);
  const [type, setType] = useState(event.types_id);
  const formattedDate = dayjs(event.date).format("DD.MM.YYYY");
  console.log(formattedDate);

  return (
    <BasicModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1 className="Modal-Header">Update Event</h1>
      <div className="EventModal-Content">
        <h1 className="EventModal-Headlines">Datum :{formattedDate}</h1>
        <div className="EventModal-Container">
          <div>
            <EventInputElement
              type={"text"}
              value={event.title}
              eventPropertyName={"title"}
              label={"title"}
            />
          </div>
        </div>
        <div className="EventModal-Container">
          {" "}
          <EventInputElement
            type={"text"}
            value={event.details}
            eventPropertyName={"details"}
            label={"details"}
          />
        </div>
        <div className="EventModal-Container">
          {" "}
          <EventInputElement
            type={"text"}
            value={event.status}
            eventPropertyName={"status"}
            label={"status"}
          />
        </div>

        <div>
          <StyledButton variant="contained" onClick={() => submitEvent(event)}>
            BESTÄTIGEN
          </StyledButton>
        </div>
      </div>
    </BasicModal>
  );
};
