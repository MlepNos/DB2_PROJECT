import { BasicModal } from "../BasicModal";
import TextField from "@mui/material/TextField";
import "../ModalStyle.css";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { MdDone, MdClear } from "react-icons/md";
import { LuShoppingBasket } from "react-icons/lu";
import { PiCookingPot } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import { IconButton, Modal } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import { useCalendarContext } from "../../../hooks/useCalendarContext";
import { FaInfoCircle } from "react-icons/fa";
//import InfoDetailModal from "../InfoDetailModal/InfoDetailModal";

export const EventDetailModal = ({
  event,
  isOpen,
  setIsOpen,
  handleSubscribeClick,
  handleUnsubscribeClick,
  setEvent,
}) => {
  const { updateEvent } = useCalendarContext();
  let participants = [];
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  const openInfoModal = () => {
    setInfoModalOpen(true);
  };
  const closeInfoModal = () => {
    setInfoModalOpen(false);
  };

  const [buttonColors, setButtonColors] = useState({
    button1: "#C5C5C5",
    button2: "#C5C5C5",
    button3: "#C5C5C5",
    button4: "#C5C5C5",
    button5: "#C5C5C5",
  });

  const [isClicked, setIsClicked] = useState({
    icon1: false,
    icon2: false,
    icon3: false,
    icon4: false,
    icon5: false,
  });

  const handleItAll = (buttonId) => {
    handleClick(buttonId);
  };

  const handleClick = (buttonId) => {
    const updatedButtonColors = { ...buttonColors };
    updatedButtonColors[buttonId] =
      updatedButtonColors[buttonId] === "#C5C5C5" ? "#043C5F" : "#C5C5C5";
    setButtonColors(updatedButtonColors);
  };

  const setEventProperty = (propertyName) => {
    const currentUserName = "kaan";

    const updatedEvent = {
      ...event,
      participants: event.participants.map((participant) =>
        participant.userName === currentUserName
          ? { ...participant, [propertyName]: !participant[propertyName] }
          : participant
      ),
    };

    setEvent(updatedEvent);
    updateEvent(updatedEvent);
  };

  const dateOptions = {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate =
    event?.date != null
      ? new Date(event.date)
          .toLocaleDateString("de-DE", dateOptions)
          .replace(",", " - ")
      : "default";

  const formattedTime =
    event?.date != null
      ? new Date(event.date).toLocaleTimeString("de-DE", timeOptions)
      : "default";

  return (
    <BasicModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="DetailModal-Header">
        <button className="DetailModal-Button">
          <FiEdit2 />
        </button>
        <button className="DetailModal-Button">
          <FiTrash2 />
        </button>
        <h1 className="Modal-Header">{formattedDate}</h1>
      </div>

      <div className="EventModal-Container">
        <p className="Modal-Time">{formattedTime}</p>
        <p className="Modal-Meal">{event.title || "default"}</p>

        <button className="DetailModal-InfoButton" onClick={openInfoModal}>
          <FaInfoCircle />
        </button>
      </div>

      <hr />
    </BasicModal>
  );
};
