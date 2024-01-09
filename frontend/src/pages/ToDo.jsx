import TodoList from "../components/ToDo.jsx";
import { TaskProvider } from "../context/TaskContext.jsx";
import { TaskDispatchContextProvider } from "../context/TaskDispatchContext.jsx";

const ToDoPage = () => {
  return (
    <TaskDispatchContextProvider>
      <TaskProvider>
        <TodoList></TodoList>
      </TaskProvider>
    </TaskDispatchContextProvider>
  );
};

export default ToDoPage;
