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
    <div className="MealList-App-Container">
      <ExecuteStoredProcedureButton
        SP={"DeleteAllEvents"}
      ></ExecuteStoredProcedureButton>
      <ExecuteStoredProcedureButton
        SP={"DeleteAllTasks"}
      ></ExecuteStoredProcedureButton>
      <ExecuteStoredProcedureButton
        SP={"DeleteAllTrails"}
      ></ExecuteStoredProcedureButton>
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
          <ul key={i++}>
            {i === 0 ? (
              <>
                <li>{date.$y + "-" + date.$M + 1 + "-" + date.$D}</li>
                <li>{data.title}</li>
                <li>{data.details}</li>
              </>
            ) : (
              <>
                {" "}
                <li>{data.title}</li>
                <li>{data.details}</li>
              </>
            )}
          </ul>
        ))}
    </div>
  );
}

export default SP;
