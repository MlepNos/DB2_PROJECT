import { BasicModal } from "../Modal/BasicModal";

import TextField from "@mui/material/TextField";

export const ValueModal = ({ isOpen, setIsOpen, value, label }) => {
  return (
    <BasicModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1 className="Modal-Header">{label}</h1>
      <div className="EventModal-Content">
        <div className="EventModal-Container">
          <TextField
            fullWidth
            multiline
            disabled
            id="standard-basic"
            value={value}
          ></TextField>
        </div>
      </div>
    </BasicModal>
  );
};
