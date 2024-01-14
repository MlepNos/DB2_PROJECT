import { useContext } from "react";
import { AuditTrailContext } from "../context/AuditTrailContext";

export const useAuditTrailContext = () => {
  const context = useContext(AuditTrailContext); //context has now dispatch and state properties

  if (!context) {
    throw Error(
      "useAuditTrailContext must be used inside an AuditTrailContext"
    );
  }

  return context;
};
