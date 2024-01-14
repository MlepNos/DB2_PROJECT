// express
const express = require("express");

// sql
const sql = require("mssql");

// env
require("dotenv").config();

// configure db connection
const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  options: {
    encrypt: true, // Use if connecting to Azure SQL Database
    trustServerCertificate: true,
  },
};

// Create a pool of database connections
const pool = new sql.ConnectionPool(config);

const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log("Connected to Database.");
  } catch (err) {
    console.error("Error connecting to Database:", err);
    throw err; // Re-throw the error to be handled by the caller
  }
};

const getAllData = async (req, res) => {
  console.log("pool", pool);

  const request = new sql.Request(pool);
  const result = await request.query("SELECT * FROM dbo.EVENT ;");
  console.log(result);
  return res.json(result.recordset);
};

const getAllTasks = async (req, res) => {
  console.log("pool", pool);

  const request = new sql.Request(pool);
  const result = await request.query("SELECT * FROM dbo.TASK ;");
  console.log(result);
  return res.json(result.recordset);
};

const createEvent = async (req, res) => {
  const { event_id, title, details, date, status, types_id, task_id } =
    req.body;
  const request = new sql.Request(pool);
  try {
    const result =
      await request.query`INSERT INTO dbo.EVENT (event_id, title, details, date, status,types_id, task_id) VALUES (${event_id},${title},${details},${date},${status},${types_id},${task_id})`;
    res.json({ success: true, message: "Record created successfully" });
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const createTask = async (req, res) => {
  const { task_name, task, date } = req.body;
  const event_id = Math.floor(Math.random() * 9999) + 1;

  const insertTaskQuery = `
    INSERT INTO TASK (task_name, task) 
    VALUES (@task_name, @task);
    SELECT SCOPE_IDENTITY() AS task_id;
  `;

  const insertEventQuery = `
    INSERT INTO dbo.EVENT (event_id, title, details, date, task_id) 
    VALUES (@event_id, @task_name, @task, @date, @task_id);
  `;

  const request = new sql.Request(pool);

  try {
    // Insert the task details
    const taskResult = await request
      .input("task_name", sql.VarChar, task_name)
      .input("task", sql.VarChar, task)
      .query(insertTaskQuery);

    const taskId = taskResult.recordset[0].task_id;

    // Insert the corresponding event using the obtained task_id
    await request
      .input("event_id", sql.Int, event_id)
      .input("task_name_event", sql.VarChar, task_name)
      .input("task_event", sql.VarChar, task)
      .input("date", sql.VarChar, date)
      .input("task_id", sql.Int, taskId)
      .query(insertEventQuery);

    // Respond with the task details
    res.status(201).json({ taskResult, event_id, taskId });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Release the connection back to the pool
    if (pool.connected) {
      pool.release();
    }
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, details, date, status, types_id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Event ID is required" });
  }

  const request = new sql.Request(pool);
  try {
    // Check if the event with the given ID exists before updating
    const checkResult = await request.query(
      `SELECT * FROM dbo.EVENT WHERE event_id = ${id}`
    );

    if (checkResult.recordset.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    let updateQuery = "UPDATE dbo.EVENT SET";

    if (title !== undefined) {
      updateQuery += ` title = '${title}',`;
    }

    if (details !== undefined) {
      updateQuery += ` details = '${details}',`;
    }

    if (date !== undefined) {
      updateQuery += ` date = '${date}',`;
    }

    if (status !== undefined) {
      updateQuery += ` status = '${status}',`;
    }

    if (types_id !== undefined) {
      updateQuery += ` types_id = ${types_id},`;
    }

    // Remove the trailing comma if any
    updateQuery = updateQuery.replace(/,$/, "");

    // Add the WHERE clause
    updateQuery += ` WHERE event_id = ${id}`;

    // Perform the update
    await request.query(updateQuery);

    const updatedEventResult = await request.query(
      `SELECT * FROM dbo.EVENT WHERE event_id = ${id}`
    );

    const updatedEvent = updatedEventResult.recordset[0];

    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// delete an Event
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Event ID is required" });
  }

  const request = new sql.Request(pool);
  try {
    // Check if the event with the given ID exists before deleting
    const checkResult = await request.query(
      `SELECT * FROM dbo.EVENT WHERE event_id = ${id}`
    );

    if (checkResult.recordset.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    // Perform the deletion
    await request.query(`DELETE FROM dbo.EVENT WHERE event_id = ${id}`);
    res.json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  const { task_id } = req.params;

  if (!task_id) {
    return res
      .status(400)
      .json({ success: false, message: "Task ID is required" });
  }

  const request = new sql.Request(pool);

  try {
    // Check if the task with the given ID exists before deleting
    const checkResult = await request.query(
      `DELETE FROM TASK WHERE task_id = ${task_id}`
    );

    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    // Release the connection back to the pool
    if (pool.connected) {
      pool.release();
    }
  }
};

const executeStoredProcedures = async (req, res) => {
  const { SP } = req.params;
  const request = new sql.Request(pool);
  try {
    const result = await request.execute(`dbo.${SP}`);
    res.json({
      success: true,
      message: "Record created successfully",
      data: result,
    });

    // Do something with the recordset if needed
  } catch (error) {
    console.error("Error showing records:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getEventsForDate = async (req, res) => {
  const { targetDate } = req.params;

  if (!targetDate) {
    return res
      .status(400)
      .json({ success: false, message: "Target date is required." });
  }

  const request = new sql.Request(pool);

  try {
    const result = await request
      .input("targetDate", sql.Date, targetDate)
      .execute("GetEventsForDate");

    res.json({ success: true, data: result.recordset });
  } catch (error) {
    console.error("Error getting events for date:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getEventCount = async () => {
  try {
    const result = await pool.request().execute("dbo.GetEventCount");

    const eventCount = result.recordset[0].EventCount;
    console.log("Total Events:", eventCount);

    return eventCount;
  } catch (error) {
    console.error("Error executing stored procedure:", error.message);
    throw error;
  }
};

const executeSearchEventsByTitle = async (req, res) => {
  const searchTitle = req.params.searchTitle;

  try {
    const result = await pool
      .request()
      .input("searchTitle", sql.VarChar(255), searchTitle)
      .execute("SearchEventsByTitle");

    res.json({
      success: true,
      data: result.recordset,
    });
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//

module.exports = {
  executeSearchEventsByTitle,
  getAllTasks,
  deleteTask,
  createTask,
  updateEvent,
  getAllData,
  connectToDatabase,
  createEvent,
  deleteEvent,
  executeStoredProcedures,
  getEventsForDate,
  pool,
  sql,
};
