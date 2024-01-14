import { createContext, useReducer } from "react";

export const TaskDispatchContext = createContext();

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case "SET_TASK":
      return {
        ...state,
        tasks: action.payload,
      };
    case "CREATE_TASK":
      return {
        tasks: [action.payload, ...state.tasks],
      };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter(
          (task) => task.task_id !== action.payload.task_id
        ),
      };
    case "EDIT_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task.task_id === action.payload.task_id ? action.payload : task
        ),
      };
    default:
      return state;
  }
};

export const TaskDispatchContextProvider = ({ children }) => {
  //the children property represents the app property that we wrapped in index js
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: [],
  });

  return (
    <TaskDispatchContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskDispatchContext.Provider>
  );
};
