const express = require("express");
const router = express.Router();

const {
  deleteTask,
  updateEvent,
  createTask,
  getAllData,
  createEvent,
  deleteEvent,
  executeStoredProcedures,
  getAllTasks,
  getEventsForDate,
  executeSearchEventsByTitle,
  countEventsController,
} = require("../controller/connect");

// GET Functions for EVENTS and TASKS
router.get("/", getAllData);
router.get("/task", getAllTasks);

// POST Functions for EVENTS and TASKS
router.post("/", createEvent);
router.post("/task", createTask);

// POST Function for EVENTS
router.patch("/:id", updateEvent);

// DELETE Functions for EVENTS and TASKS
router.delete("/:id", deleteEvent);
router.delete("/task/:task_id", deleteTask);

// Stored Procedures
router.get("/execute/:SP", executeStoredProcedures);
router.get("/execute/date/:targetDate", getEventsForDate);
router.get("/execute/searchEvents/:searchTitle", executeSearchEventsByTitle);
router.get("/execute/count", countEventsController);

module.exports = router;
