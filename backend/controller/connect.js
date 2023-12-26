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

/*function Connect() {
  pool
    .connect()
    .then(() => {
      // listen for requests only if we are connected
      app.listen(process.env.PORT, () => {
        console.log(
          "connected to db and Listening on port : " + process.env.PORT
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
 */

const getAllData = async (req, res) => {
  console.log("pool", pool);

  const request = new sql.Request(pool);
  const result = await request.query("SELECT * FROM dbo.employee");
  return res.json(result.recordset);
};

module.exports = {
  getAllData,
  connectToDatabase,
  pool,
  sql,
};