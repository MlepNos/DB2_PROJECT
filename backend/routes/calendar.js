const express = require("express");
const router = express.Router();

const { getAllData } = require("../controller/connect");

router.get("/", getAllData);

module.exports = router;
