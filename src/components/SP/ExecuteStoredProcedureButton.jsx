import { useState } from "react";
import StyledButton from "../Styled_MUI_Components/StyledButton.jsx";
import "./SP.css";
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
    <button
      className="SP-Button"
      onClick={() => handleButtonClick(SP)}
      disabled={loading}
    >
      {loading ? "Executing..." : `Execute SP:   ${SP}`}
    </button>
  );
};
