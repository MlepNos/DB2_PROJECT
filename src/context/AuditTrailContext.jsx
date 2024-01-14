import { createContext, useReducer } from "react";

export const AuditTrailContext = createContext();

export const trailsReducer = (state, action) => {
  switch (action.type) {
    case "SET_AUDITTRAIL":
      return {
        trails: action.payload,
      };
    default:
      return state;
  }
};

export const AuditTrailContextProvider = ({ children }) => {
  //the children property represents the app property that we wrapped in index js
  const [state, dispatch] = useReducer(trailsReducer, {
    trails: null,
  });

  return (
    <AuditTrailContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuditTrailContext.Provider>
  );
};
