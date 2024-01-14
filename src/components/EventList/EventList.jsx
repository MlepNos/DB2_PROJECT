import "./EventList.css";
import EventListTable from "./EventListTable.jsx";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import { EventModal } from "../Modal/EventModal/EventModal.jsx";
import { useEventListContext } from "../../hooks/useEventListContext.js";
import { useState } from "react";
import { EventDetailModal } from "../Modal/EventDetailModal/EventDetailModal.jsx";
import { EventListModal } from "../Modal/EventListModal/EventListModal.jsx";
import { EventListUpdateModal } from "../Modal/EventListModal/EventListUpdateModal.jsx";
const StyledEventButton = styled(Button)({
  fontFamily: "Segoe UI",
  fontWeight: 400,
  color: "white",
  backgroundColor: "#2a3d71",
  width: "auto",
  borderRadius: "1vh",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#343537",
  },
});

function EventList({ events }) {
  const {
    isModalOpen,
    setIsModalOpen,
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    openAddEventModal,
  } = useEventListContext();
  console.log("events mealList", events);
  return (
    <div className="MealList-App-Container">
      <EventListTable events={events} />
      <StyledEventButton onClick={openAddEventModal}>
        Event hinzufügen
      </StyledEventButton>
      <EventListModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      ></EventListModal>
      <EventListUpdateModal
        isOpen={isUpdateModalOpen}
        setIsOpen={setIsUpdateModalOpen}
      ></EventListUpdateModal>
    </div>
  );
}

export default EventList;
