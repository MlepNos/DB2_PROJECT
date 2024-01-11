import AuditTrailList from "../components/AuditTrail/AuditTrailList";
import { AuditTrailContextProvider } from "../context/AuditTrailContext";

const AuditTrail = ({ trails }) => {
  console.log("AUDIT TRAIL PAGE");
  return (
    <div className="home">
      <div className="meals">
        <AuditTrailList trails={trails}></AuditTrailList>
      </div>
    </div>
  );
};

export default AuditTrail;
