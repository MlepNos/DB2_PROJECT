import { useState } from "react";

export const ExecuteStoredProceduteAuditButton = ({
  SP,
  setIsSearchClicked,
}) => {
  const [loading, setLoading] = useState(false);

  const handleButtonClickDelete = async () => {
    setIsSearchClicked(true);
    try {
      setLoading(true);

      const response = await fetch(`/api/audit/execute`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
      } else {
        console.error("Error deleting events:", data.message);
      }
    } catch (error) {
      console.error("Error deleting events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="SP-Button"
      onClick={handleButtonClickDelete}
      disabled={loading}
    >
      {loading ? "Executing..." : `Execute SP:   ${SP}`}
    </button>
  );
};
