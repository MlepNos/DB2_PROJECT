// express
const express = require("express");

// express app
const app = express();

// routes
const calendarRoutes = require("./routes/calendar");

const { connectToDatabase, pool, sql } = require("./controller/connect");

// Express middleware to parse incoming JSON requests (for using req.body)
app.use(express.json());

// global middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api", calendarRoutes);

connectToDatabase().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
  });
});
