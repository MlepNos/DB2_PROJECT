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
  const result = await request.query(
    "SELECT * FROM dbo.EVENT JOIN TYPES ON EVENT.types_id = TYPES.types_id;"
  );
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

  ////////////////////////////////////
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

const executeStoredProcedures = async (req, res) => {
  const request = new sql.Request(pool);
  try {
    const result = await request.execute("dbo.GetAllEmployees");
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

module.exports = {
  getAllData,
  connectToDatabase,
  createEvent,
  deleteEvent,
  executeStoredProcedures,
  pool,
  sql,
};
