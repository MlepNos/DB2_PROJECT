import { BasicModal } from "../BasicModal";

import "../ModalStyle.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export const EventDetailModal = ({ event, isOpen, setIsOpen }) => {
  const dateOptions = {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };

  const formattedDate =
    event?.date != null
      ? new Date(event.date)
          .toLocaleDateString("de-DE", dateOptions)
          .replace(",", " - ")
      : "default";

  const handleTypes = (type_id) => {
    switch (type_id) {
      case 1:
        return "Meeting";
      case 2:
        return "Appointment";
      case 3:
        return "Conference";
      case 4:
        return "Birthday";
      case 5:
        return "Exam";
      case 5:
        return "Homework";
      default:
        return "None";
    }
  };

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
        <p className="Modal-Meal">Title: {event.title || "default"}</p>
      </div>

      <div className="EventModal-Container">
        <p className="Modal-Meal">
          Type: {handleTypes(event.types_id) || "default"}
        </p>
      </div>

      <div className="EventModal-Container">
        <p className="Modal-Meal">Details: {event.details || "default"}</p>
      </div>

      <hr />
    </BasicModal>
  );
};
