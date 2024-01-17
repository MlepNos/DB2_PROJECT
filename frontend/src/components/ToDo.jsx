import React, { useState, useEffect } from "react";
import { useTasksContext } from "../hooks/useTasksContext";

const TodoList = ({ backendTasks }) => {
  console.log("backendTasks :", backendTasks);
  const [tasks2, setTasks] = useState([]);
  const [task_name, setTaskName] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const { addTask, deleteTask, tasks } = useTasksContext();
  const [dateLocal, setDateLocal] = useState("");

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
    <div style={styles.container}>
      <h1 style={styles.heading}>Todo List</h1>
      <div style={styles.inputContainer}>
        <label>
          Task Name:
          <input
            type="text"
            value={task_name}
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
            onChange={(e) => {
              setTaskDate(e.target.value);
              setDateLocal(e.target.value);
            }}
            style={styles.input}
          />
        </label>
      </div>
      <button onClick={handleAddTask} style={styles.addButton}>
        Add Task
      </button>

      <ul style={styles.taskList}>
        {tasks2.map((task) => (
          <li key={task.task_id} style={styles.taskItem}>
            <div>
              <strong>Task ID: {task.task_id}</strong>
            </div>
            <div>
              <strong>Task Name: {task.task_name}</strong>
            </div>
            <div>Task Details: {task.task}</div>

            <button
              onClick={() => handleDeleteTask(task.task_id)}
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
