const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");
const testResultsController = require("../controllers/testResultsController");

router.post("/add", testController.addTest);
router.post("/addAutomatic", testController.addAutomaticTest);
router.get("/getall", testController.getAllTests);
router.delete("/delall", testController.deleteAllTest);
router.get("/getbyid/:id", testController.getTestById);
router.delete("/delete/:id", testController.deleteTest);
router.put("/update/:id", testController.updateTest);
//passage de test
router.post("/AffecterTestToCondidat", testController.affecterTestAuCandidat);
router.get("/getTestPasserbyCandidat", testController.getTestPasserbyCandidat);
router.put("/passTest", testController.PassTest);
router.get("/getbyCandidat", testController.getbyCandidat);
//resultat de test
router.get("/getResultTests", testResultsController.getAllResultsTests);

router.get("/getCandidatRapport", testResultsController.rapportCandidat);
//router.get(
// 	"/getResultTestsByOffre",
// 	testResultsController.getResultTestsByOffre
// );

module.exports = router;
