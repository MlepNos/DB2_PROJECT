import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { EventContextProvider } from "./context/EventContext";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
    <EventContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EventContextProvider>
  </LocalizationProvider>
);
