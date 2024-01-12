import React, { useState } from "react";
import { ValueModal } from "./ValueModal";
const AuditTrailTableData = ({ trail }) => {
  const inputDateString = trail?.Timestamp;
  const inputDate = new Date(inputDateString);
  const [isOpenOld, setIsOpenOld] = useState(false);
  const [isOpenNew, setIsOpenNew] = useState(false);
  const formattedDate = inputDate.toLocaleDateString("en-GB"); // 'en-GB' for day/month/year format

  function handleClickOld(param) {
    setIsOpenOld(true);
  }
  function handleClickNew(param) {
    setIsOpenNew(true);
  }
  return (
    <>
      <td>{trail?.AuditTrailID}</td>
      <td>{trail?.TableName}</td>
      <td>{trail?.Action}</td>
      <td>{formattedDate}</td>
      <td>
        {trail.OldValues ? (
          <>
            <button onClick={handleClickOld}>?</button>
            <ValueModal
              isOpen={isOpenOld}
              setIsOpen={setIsOpenOld}
              value={trail?.OldValues}
              label={"Old Value"}
            ></ValueModal>
          </>
        ) : (
          "None"
        )}
      </td>
      <td>
        {trail.NewValues ? (
          <>
            <button onClick={handleClickNew}>?</button>
            <ValueModal
              isOpen={isOpenNew}
              setIsOpen={setIsOpenNew}
              value={trail?.NewValues}
              label={"New Value"}
            ></ValueModal>
          </>
        ) : (
          "None"
        )}
      </td>
    </>
  );
};

export default AuditTrailTableData;
