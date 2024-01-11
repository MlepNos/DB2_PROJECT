const express = require("express");
const router = express.Router();
const {
  getAllData,
  executeStoredProcedures,
} = require("../controller/connectAuditTrail");

router.get("/audit", getAllData);

// Stored Procedures
router.get("/audit/execute", executeStoredProcedures);

module.exports = router;
