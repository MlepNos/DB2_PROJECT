import { useState } from "react";
import StyledButton from "../../Styled_MUI_Components/StyledButton.jsx";

export const ExecuteStoredProcedureButton = () => {
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/execute", {
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
      onClick={handleButtonClick}
      disabled={loading}
    >
      {loading ? "Executing..." : "Execute Stored Procedure"}
    </StyledButton>
  );
};
