const express = require("express");
const router = express.Router();

const {
  getAllData,
  createEvent,
  deleteEvent,
  executeStoredProcedures,
} = require("../controller/connect");

router.get("/", getAllData);

router.post("/", createEvent);

router.delete("/:id", deleteEvent);

router.get("/execute", executeStoredProcedures);

module.exports = router;
