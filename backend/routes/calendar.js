const express = require("express");
const router = express.Router();

const {
  updateEvent,
  createTask,
  getAllData,
  createEvent,
  deleteEvent,
  executeStoredProcedures,
} = require("../controller/connect");

router.get("/", getAllData);

router.post("/", createEvent);

router.patch("/:id", updateEvent);
router.post("/task", createTask);

router.delete("/:id", deleteEvent);

router.get("/execute", executeStoredProcedures);

module.exports = router;
