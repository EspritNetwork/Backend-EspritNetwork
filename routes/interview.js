const express = require("express");
const router = express.Router();
const PlanifierEntretien = require("../controllers/interviewController");

router.post("/planifier", PlanifierEntretien.PlanifierEntretien);

module.exports = router;
