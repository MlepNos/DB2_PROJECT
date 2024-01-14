import React, { useState, useEffect } from "react";
import { useTasksContext } from "../../hooks/useTasksContext";
import "./ToDo.css";

const TodoList = ({ backendTasks }) => {
  console.log("backendTasks :", backendTasks);
  const [tasks2, setTasks] = useState([]);
  const [task_name, setTaskName] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const { addTask, deleteTask, tasks } = useTasksContext();

  console.log("tasks: ", tasks);
  useEffect(() => {
    toArray();
  }, [tasks]);
  const toArray = () => {
    if (tasks != null) {
      const newLists = Object.values(tasks);
      setTasks(newLists);
    }
  };

  const handleAddTask = () => {
    if (
      task_name.trim() === "" ||
      taskDetails.trim() === "" ||
      taskDate.trim() === ""
    ) {
      // Ensure all fields are filled before adding a task
      alert("Please fill in all fields.");
      return;
    }

    const newTask = {
      task_name: task_name,
      task: taskDetails,
      date: taskDate,
    };

    addTask(newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Clear input fields after adding a task
    setTaskName("");
    setTaskDetails("");
    setTaskDate("");
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.task_id !== taskId)
    );
  };

  return (
    <div className="ToDo-Container">
      <div className="ToDo-Con">
        <h1 className="ToDo-Header">Todo List</h1>
        <div className="ToDo-Content">
          <label className="ToDo-Label">
            Task Name:
            <input
              type="text"
              value={task_name}
              onChange={(e) => setTaskName(e.target.value)}
              className="ToDo-Inputfield"
            />
          </label>
        </div>
        <div className="ToDo-Content">
          <label className="ToDo-Label">
            Task Details:
            <input
              type="text"
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
              className="ToDo-Inputfield"
            />
          </label>
        </div>
        <div className="ToDo-Content">
          <label className="ToDo-Label">
            Task Date:
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="ToDo-Inputfield"
            />
          </label>
        </div>
        <button className="ToDo-Button" onClick={handleAddTask}>
          Add Task
        </button>

        <ul className="ToDo-List">
          {tasks2.map((task) => (
            <div className="ToDo-List-element" key={task.task_id}>
              <div>
                <strong>Task ID: {task.task_id}</strong>
              </div>
              <div>
                <strong>Task Name: {task.task_name}</strong>
              </div>
              <div>Task Details: {task.task}</div>
              <div>Date: {task.date}</div>
              <button
                className="ToDo-Button-delete"
                onClick={() => handleDeleteTask(task.task_id)}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "40px",
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  addButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    width: "100%",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px",
  },
  taskItem: {
    backgroundColor: "#fff",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  deleteButton: {
    backgroundColor: "#ff6347",
    color: "#fff",
    padding: "6px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    marginLeft: "5px",
  },
};

export default TodoList;
