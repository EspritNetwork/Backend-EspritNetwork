const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

router.post("/add", testController.addTest);
router.post("/addAutomatic", testController.addAutomaticTest);
router.get("/getall", testController.getAllTests);
router.delete("/delall", testController.deleteAllTest);
router.get("/getbyid/:id", testController.getTestById);
router.delete("/delete/:id", testController.deleteTest);
router.put("/update/:id", testController.updateTest);
//passage de test
router.post("/AffecterTestToCondidat", testController.AffecterTestToCondidat);
router.get("/getbyCandidat", testController.getbyCandidat);


module.exports = router;