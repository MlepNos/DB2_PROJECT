import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { EventContextProvider } from "./context/EventContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <EventContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </EventContextProvider>
);
