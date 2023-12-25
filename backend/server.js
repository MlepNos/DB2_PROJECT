// express
const express = require("express");

// sql
const sql = require("mssql");

// env
require("dotenv").config();

const app = express();

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
const poolConnect = pool.connect();

// Express middleware to parse incoming JSON requests
app.use(express.json());

// Define a simple API endpoint
app.get("/api/calendar", async (req, res) => {
  try {
    await poolConnect;
    const result = await pool.request().query("SELECT * FROM dbo.employee");
    res.json(result.recordset);
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
