import { useContext } from "react";
import { EventListContext } from "../context/EventListContext";

export const useEventListContext = () => {
  const context = useContext(EventListContext); //context has now dispatch and state properties

  if (!context) {
    throw Error(
      "useMealListContext must be used inside an MealListContextProvider"
    );
  }

  return context;
};
