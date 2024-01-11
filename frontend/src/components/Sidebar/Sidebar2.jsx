import React, { useState } from "react";
import "./Sidebar2.css";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { VscBook } from "react-icons/vsc";
import { MdRestaurantMenu } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { MdEuroSymbol } from "react-icons/md";
import { VscOrganization } from "react-icons/vsc";
import { TfiBarChart } from "react-icons/tfi";
import { TfiInfoAlt } from "react-icons/tfi";

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
      default:
        return navigate("/Events");
    }
  }

  const listItems = ["Calendar", "Events", "ToDo", "AuditTrail"];

  const iconMap = {
    Calendar: <MdEuroSymbol size={18 + 0.390625} style={{ fill: "white" }} />,
    Events: <VscBook size={18 + 0.390625} style={{ fill: "white" }} />,
    ToDo: <MdRestaurantMenu size={18 + 0.390625} style={{ fill: "white" }} />,
    AuditTrail: <SlBasket size={18 + 0.390625} style={{ fill: "white" }} />,

    Mitarbeiter: (
      <VscOrganization size={18 + 0.390625} style={{ fill: "white" }} />
    ),
    Statistik: <TfiBarChart size={18 + 0.390625} style={{ fill: "white" }} />,
    Infos: <TfiInfoAlt size={18 + 0.390625} style={{ fill: "white" }} />,
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="profile"></div>
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
