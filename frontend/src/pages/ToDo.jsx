import TodoList from "../components/ToDo.jsx";
import { TaskProvider } from "../context/TaskContext.jsx";

const ToDoPage = ({ tasks }) => {
  return (
    <TaskProvider>
      <TodoList backendTasks={tasks}></TodoList>
    </TaskProvider>
  );
};

export default ToDoPage;
