const express = require("express");
const router = express.Router();

const {
  getAllData,
  createEvent,
  executeStoredProcedures,
} = require("../controller/connect");

router.get("/", getAllData);

router.post("/", createEvent);

router.get("/execute", executeStoredProcedures);

module.exports = router;
