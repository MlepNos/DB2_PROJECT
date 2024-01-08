import MealTableData from "./MealTableData.jsx";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { useEventListContext } from "../../hooks/useEventListContext.js";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaInfoCircle } from "react-icons/fa";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "35vh",
  left: "85vh",
  transform: "translate(-30vh, -30vh)",
  maxWidth: "100vh",
  minWidth: "80vh",
  width: "auto",
  bgcolor: "background.paper",
  borderRadius: "2vh",
  p: "3vh",
};
const MealListTableBody = ({ events }) => {
  const { deleteEvent, handleClickEventEdit } = useEventListContext();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const openDeleteModal = (event) => {
    setSelectedEvent(event);
  };

  const closeDeleteModal = () => {
    setSelectedEvent(null);
  };

  return (
    <tbody>
      {events?.map((event) => (
        <tr key={event?.event_id}>
          <MealTableData event={event}></MealTableData>
          <td>
            <div className="MeaList-icon-container">
              <button
                onClick={() => handleClickEventEdit(event)}
                className="MealList-icon-button"
              >
                <FaPen />
              </button>

              <div className="MealList-icon-gap"></div>

              <button
                onClick={() => openDeleteModal(event)}
                className="MealList-icon-button"
              >
                <FaRegTrashAlt />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default MealListTableBody;
