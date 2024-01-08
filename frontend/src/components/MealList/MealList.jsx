import "./MealList.css";
import MealListTable from "./MealListTable.jsx";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { EventModal } from "../Modal/EventModal/EventModal.jsx";
import { useEventListContext } from "../../hooks/useEventListContext.js";
import { useState } from "react";
import { EventDetailModal } from "../Modal/EventDetailModal/EventDetailModal.jsx";
import { EventListModal } from "../Modal/EventListModal/EventListModal.jsx";
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

function MealList({ events }) {
  const [isEventModalOpen, setIsEventModal] = useState(false);
  const handleEventButtonClick = () => {
    setIsEventModal(true);
  };

  const { openAddEventModal } = useEventListContext();
  return (
    <div className="MealList-App-Container">
      <MealListTable events={events} />
      <StyledEventButton onClick={handleEventButtonClick}>
        Event hinzufügen
      </StyledEventButton>
      <EventListModal isOpen={isEventModalOpen} setIsOpen={setIsEventModal} />
    </div>
  );
}

export default MealList;
