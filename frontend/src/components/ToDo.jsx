import React, { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const { addTask, task, setTask } = useTasksContext();
  const handleAddTask = () => {
    if (
      taskName.trim() === "" ||
      taskDetails.trim() === "" ||
      taskDate.trim() === ""
    ) {
      // Ensure all fields are filled before adding a task
      alert("Please fill in all fields.");
      return;
    }

    const newTask = {
      id: new Date().getTime(), // You might want to use a better ID generation method
      name: taskName,
      details: taskDetails,
      date: taskDate,
    };
    setTask((prevTask) => ({
      ...prevTask,
      newTask, // Replace 'new value' with the actual value you want to set
    }));
    addTask(newTask);

    setTasks((prevTasks) => [...prevTasks, newTask]);
    // Clear input fields after adding a task
    setTaskName("");
    setTaskDetails("");
    setTaskDate("");
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Todo List</h1>
      <div style={styles.inputContainer}>
        <label>
          Task Name:
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            style={styles.input}
          />
        </label>
      </div>
      <div style={styles.inputContainer}>
        <label>
          Task Details:
          <input
            type="text"
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
            style={styles.input}
          />
        </label>
      </div>
      <div style={styles.inputContainer}>
        <label>
          Task Date:
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            style={styles.input}
          />
        </label>
      </div>
      <button onClick={handleAddTask} style={styles.addButton}>
        Add Task
      </button>

      <ul style={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} style={styles.taskItem}>
            <div>
              <strong>{task.name}</strong>
            </div>
            <div>{task.details}</div>
            <div>{task.date}</div>
            <button
              onClick={() => handleDeleteTask(task.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
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
