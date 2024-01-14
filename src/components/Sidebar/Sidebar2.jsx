import React, { useState } from "react";
import "./Sidebar2.css";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { VscBook } from "react-icons/vsc";
import { LuListTodo } from "react-icons/lu";
import { SlBasket } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";
import { VscOrganization } from "react-icons/vsc";
import { AiOutlineAudit } from "react-icons/ai";
import { GoDatabase } from "react-icons/go";
import { GiDoubleFaceMask } from "react-icons/gi";
function Sidebar({ children }) {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState();

  function SwitchPath(path) {
    console.log(path);
    switch (path) {
      case "Calendar":
        return navigate("/Calendar");
      case "Events":
        return navigate("/Events");
      case "ToDo":
        return navigate("/ToDo");
      case "AuditTrail":
        return navigate("/AuditTrail");
      case "StoredProcedures":
        return navigate("/StoredProcedures");
      default:
        return navigate("/Events");
    }
  }

  const listItems = [
    "Calendar",
    "Events",
    "ToDo",
    "AuditTrail",
    "StoredProcedures",
  ];

  const iconMap = {
    Calendar: <FaRegCalendarAlt className="Sidebar-Icons" />,
    Events: <VscBook className="Sidebar-Icons" />,
    ToDo: <LuListTodo className="Sidebar-Icons" />,
    AuditTrail: <AiOutlineAudit className="Sidebar-Icons" />,

    StoredProcedures: <GoDatabase className="Sidebar-Icons" />,
    Statistik: <AiOutlineAudit className="Sidebar-Icons" />,
    Infos: <GoDatabase className="Sidebar-Icons" />,
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="profile"></div>
          <GiDoubleFaceMask className="sidebar-icon" />
          <div className="sidebar-list">
            {listItems.map((item) => {
              return (
                <div
                  className={`button ${selectedTab === item ? "active" : ""}`}
                  onClick={() => {
                    SwitchPath(item);
                    setSelectedTab(item);
                  }}
                  key={item}
                >
                  <div className="icon">{iconMap[item]}</div>
                  <div className="text">{item}</div>
                </div>
              );
            })}
          </div>

          <div className="sidebar-footer"></div>
        </div>
      </div>
      <Container>
        <div>{children}</div>
      </Container>
    </>
  );
}

export default Sidebar;
