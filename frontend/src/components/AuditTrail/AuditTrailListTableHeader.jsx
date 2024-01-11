import TableHeader from "../TableHeader";

const AuditTrailListTableHeader = () => {
  return (
    <TableHeader
      headers={[
        "AuditTrailID",
        "TableName",
        "Action",
        "Timestamp",
        "OldValues",
        "NewValues",
      ]}
    />
  );
};

export default AuditTrailListTableHeader;
