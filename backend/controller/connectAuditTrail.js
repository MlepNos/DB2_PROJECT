// express
const express = require("express");

// sql
const sql = require("mssql");

// env
require("dotenv").config();

const configAudit = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASEAUDIT,
  options: {
    encrypt: true, // Use if connecting to Azure SQL Database
    trustServerCertificate: true,
  },
};

const poolAudit = new sql.ConnectionPool(configAudit);

const connectToDatabaseAudit = async () => {
  try {
    await poolAudit.connect();
    console.log("Connected to Database Audit .");
  } catch (err) {
    console.error("Error connecting to Database:", err);
    throw err; // Re-throw the error to be handled by the caller
  }
};

const getAllData = async (req, res) => {
  console.log("pool", poolAudit);

  const request = new sql.Request(poolAudit);
  const result = await request.query("SELECT * FROM dbo.AuditTrail ;");
  console.log(result);
  return res.json(result.recordset);
};

const executeStoredProcedures = async (req, res) => {
  const request = new sql.Request(poolAudit);
  try {
    const result = await request.execute("dbo.DeleteAllTrails");
    res.json({
      success: true,
      message: "Records deleted successfully",
      data: result,
    });

    // Do something with the recordset if needed
  } catch (error) {
    console.error("Error showing records:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  connectToDatabaseAudit,
  poolAudit,
  sqlAudit: sql,
  getAllData,
  executeStoredProcedures,
};
