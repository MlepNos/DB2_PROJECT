import { useState } from "react";
import StyledButton from "../Styled_MUI_Components/StyledButton.jsx";

export const ExecuteStoredProcedureButton = ({ SP }) => {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async (SP) => {
    try {
      setLoading(true);

      const response = await fetch("/api/execute/" + SP, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Stored procedure executed successfully:", data);
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
      onClick={() => handleButtonClick(SP)}
      disabled={loading}
    >
      {loading ? "Executing..." : `Execute SP:   ${SP}`}
    </StyledButton>
  );
};
