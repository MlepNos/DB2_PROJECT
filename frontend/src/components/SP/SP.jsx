import { ExecuteStoredProcedureButton } from "./ExecuteStoredProcedureButton";
import StyledDateField from "../Styled_MUI_Components/StyledDateField";
import dayjs from "dayjs";
import { useState } from "react";
import { ExecuteStoredDateProcedureButton } from "./ExecuteStoredDateProcedureButton";
console.log(SP);
function SP() {
  const [date, setDate] = useState(dayjs());
  const [datas, setDatas] = useState([]);
  const [isDateClicked, setIsDateClicked] = useState();
  return (
    <div className="SP-Container">
      <div className="SP-Content">
        <ExecuteStoredProcedureButton
          SP={"DeleteAllEvents"}
        ></ExecuteStoredProcedureButton>
        <ExecuteStoredProcedureButton
          SP={"DeleteAllTasks"}
        ></ExecuteStoredProcedureButton>
        <ExecuteStoredProcedureButton
          SP={"DeleteAllTrails"}
        ></ExecuteStoredProcedureButton>
      </div>

      <div>
        <StyledDateField
          label="Date"
          value={date}
          onChange={(newDate) => setDate(newDate)}
        ></StyledDateField>
        <ExecuteStoredDateProcedureButton
          SP={"GetEventsForDate"}
          date={date}
          setIsDateClicked={setIsDateClicked}
          setDatas={setDatas}
        ></ExecuteStoredDateProcedureButton>
      </div>

      {isDateClicked &&
        datas.map((data, i) => (
          <div className="List-element" key={i++}>
            {i === 0 ? (
              <div className="List-element-date">
                {date.$y + "-" + date.$M + 1 + "-" + date.$D}
              </div>
            ) : (
              ""
            )}

            <div>title: {data.title}</div>
            <div>details: {data.details}</div>
          </div>
        ))}
    </div>
  );
}

export default SP;
