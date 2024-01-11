import AuditTrailListTableHeader from "./AuditTrailListTableHeader";
import AuditTrailListTableBody from "./AuditTrailListTableBody";

const AuditTrailListTable = ({ trails }) => {
  return (
    <div className="table-con">
      <table className="table">
        <AuditTrailListTableHeader />
        <AuditTrailListTableBody trails={trails} />
      </table>
    </div>
  );
};

export default AuditTrailListTable;
