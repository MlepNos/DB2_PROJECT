import StyledTextField from "../../Styled_MUI_Components/StyledTextField";
import { useEventListContext } from "../../../hooks/useEventListContext";

const EventInputElement = ({
  type,
  placeholderText,
  value,
  eventPropertyName,
}) => {
  const { event, setEvent } = useEventListContext();

  return (
    <StyledTextField
      variant="outlined"
      type={type}
      placeholder={placeholderText}
      value={value}
      onChange={(e) => {
        console.log("e :", e.target.value);

        setEvent({ ...event, [eventPropertyName]: e.target.value });
        console.log("e :", event);
      }}
    ></StyledTextField>
  );
};

export default EventInputElement;
