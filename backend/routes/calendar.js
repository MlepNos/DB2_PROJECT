const express = require("express");
const router = express.Router();

const { getAllData, createEvent } = require("../controller/connect");

router.get("/", getAllData);

router.post("/", createEvent);

module.exports = router;
