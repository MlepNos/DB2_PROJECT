import { useEffect } from "react";
import { useAuditTrailContext } from "../../hooks/useAuditTrailContext.js";

import { Routes, Route } from "react-router-dom";
import AuditTrail from "../../pages/AuditTrail.jsx";

function FetchAuditTrail() {
  const { trails, dispatch } = useAuditTrailContext();

  useEffect(() => {
    try {
      const fetchAuditTrail = async () => {
        const response = await fetch("/api/audit");
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_AUDITTRAIL", payload: json });
        }
      };

      fetchAuditTrail();
    } catch (error) {
      console.log("Error:", error);
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/AuditTrail" element={<AuditTrail trails={trails} />} />
    </Routes>
  );
}

export default FetchAuditTrail;
