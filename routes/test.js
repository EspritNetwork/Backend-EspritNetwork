const express = require("express");
const router = express.Router();
const testController = require("../controller/testController");

router.post("/add", testController.addTest);
router.get("/getall", testController.getAllTests);
router.delete("/delall", testController.deleteAllTest);
router.get("/getbyid/:id", testController.getTestById);
router.delete("/delete/:id", testController.deleteTest);
router.put("/update/:id", testController.updateTest);

module.exports = router;
