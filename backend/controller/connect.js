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
  const result = await request.query("SELECT * FROM dbo.EVENTS");
  return res.json(result.recordset);
};

const createEvent = async (req, res) => {
  const { event_id, title, details, type, date, status, task_id } = req.body;
  const request = new sql.Request(pool);
  try {
    const result =
      await request.query`INSERT INTO dbo.EVENTS (event_id, title, details, type, date, status, task_id) VALUES (${event_id},${title},${details},${type},${date},${status},${task_id})`;
    res.json({ success: true, message: "Record created successfully" });
  } catch (error) {
    console.error("Error creating record:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }

  ////////////////////////////////////
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
  executeStoredProcedures,
  pool,
  sql,
};
