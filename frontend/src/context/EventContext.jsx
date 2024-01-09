import { createContext, useReducer } from "react";

export const EventContext = createContext();

export const eventsReducer = (state, action) => {
  switch (action.type) {
    case "SET_EVENT":
      return {
        events: action.payload,
      };
    case "CREATE_EVENT":
      return {
        events: [action.payload, ...state.events],
      };
    case "DELETE_EVENT":
      return {
        events: state.events.filter(
          (event) => event.event_id !== action.payload.event_id
        ),
      };
    case "EDIT_EVENT":
      return {
        events: state.events.map((event) =>
          event.event_id === action.payload.event_id ? action.payload : event
        ),
      };
    default:
      return state;
  }
};

export const EventContextProvider = ({ children }) => {
  //the children property represents the app property that we wrapped in index js
  const [state, dispatch] = useReducer(eventsReducer, {
    events: null,
  });

  return (
    <EventContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};
