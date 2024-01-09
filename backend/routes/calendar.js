const express = require("express");
const router = express.Router();

const {
  updateEvent,
  getAllData,
  createEvent,
  deleteEvent,
  executeStoredProcedures,
} = require("../controller/connect");

router.get("/", getAllData);

router.post("/", createEvent);

router.patch("/:id", updateEvent);

router.delete("/:id", deleteEvent);

router.get("/execute", executeStoredProcedures);

module.exports = router;
