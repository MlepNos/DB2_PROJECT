import { createContext, useState } from "react";

import { useEventsContext } from "../hooks/useEventsContext";

export const EventListContext = createContext();

export const EventListProvider = ({ children }) => {
  const emptyEvent = {
    event_id: 0,
    title: "",
    details: "",
    type: "",
    date: "",
    status: "",
    task_id: 0,
  };

  const { dispatch } = useEventsContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [event, setEvent] = useState(emptyEvent);

  const addEvent = async (event) => {
    const response = await fetch("/api/events/", {
      method: "POST",
      body: JSON.stringify({
        ...event,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "CREATE_EVENT", payload: json });
      setIsModalOpen(false);
      setIsAdding(false);
    }
  };

  const updateEvent = async (event) => {
    const response = await fetch("/api/events/" + event.event_id, {
      method: "PATCH",
      body: JSON.stringify({
        ...event,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "EDIT_EVENT", payload: json });
      setIsModalOpen(false);
    }
  };

  const deleteEvent = async (event) => {
    const response = await fetch("/api/" + event.event_id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_EVENT", payload: json });
    }
  };

  const handleClickEdit = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickEventEdit = (event) => {
    setEvent(event);
    handleClickEdit();
  };

  const openAddEventModal = () => {
    setEvent(emptyEvent);
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const submitEvent = (event) => {
    if (isAdding) {
      addEvent(event);
    } else {
      updateEvent(event);
    }
  };

  const contextValue = {
    event,
    setEvent,
    isAdding,
    isModalOpen,
    setIsModalOpen,
    addEvent,
    updateEvent,
    deleteEvent,
    handleClickEventEdit,
    openAddEventModal,
    submitEvent,
  };

  return (
    <EventListContext.Provider value={contextValue}>
      {children}
    </EventListContext.Provider>
  );
};
