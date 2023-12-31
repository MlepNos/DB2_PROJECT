import { useState } from "react";
import "./Dropdown.css";
import { GiBalaclava } from "react-icons/gi";

export default function Dropdown({
  setActivatedFromAbove,
  events,
  selected,
  setSelected,
  setName,
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        onClick={(e) => {
          setIsActive(!isActive);
        }}
      >
        {selected} <GiBalaclava />
        <span className="fas fa-caret-down"></span>
        <div>
          {isActive && (
            <div className="dropdown-content">
              {events.map((event) => (
                <div
                  onClick={(e) => {
                    setSelected(event.checked);
                    setIsActive(false);
                    setActivatedFromAbove(false);
                    setName(event.first_name);
                  }}
                  className="dropdown-item"
                >
                  {event.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
