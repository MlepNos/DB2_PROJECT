const express = require("express");
const router = express.Router();
const { getAllData } = require("../controller/connectAuditTrail");

router.get("/audit", getAllData);

module.exports = router;
