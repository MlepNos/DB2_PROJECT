import { useState } from "react";
import StyledButton from "../Styled_MUI_Components/StyledButton.jsx";

export const ExecuteStoredDateProcedureButton = ({
  SP,
  date,
  setIsDateClicked,
  setDatas,
}) => {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async (date) => {
    setIsDateClicked(true);
    try {
      setLoading(true);
      console.log(
        "/api/execute/date/" + date.$y + "-" + date.$M + 1 + "-" + date.$D
      );
      const response = await fetch(
        "/api/execute/date/" + date.$y + "-" + date.$M + 1 + "-" + date.$D,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        const dataArray = Array.isArray(data) ? data : Object.values(data);

        setDatas(data.data);
        console.log("Stored procedure executed successfully:", data.data);
        // Do something with the data if needed
      } else {
        console.error("Error executing stored procedure:", data.message);
      }
    } catch (error) {
      console.error("Error executing stored procedure:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledButton
      variant="contained"
      onClick={() => handleButtonClick(date)}
      disabled={loading}
    >
      {loading ? "Executing..." : `Execute SP: ${SP}`}
    </StyledButton>
  );
};
