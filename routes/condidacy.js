const express = require("express");
const router = express.Router();
const condidacyController = require("../controller/condidacyController");

router.post('/add', condidacyController.addCondidacy);
router.get('/getall', condidacyController.getAllCondidacies);
router.get('/getbyid/:id', condidacyController.getCondidacyById);
router.delete('/delete/:id', condidacyController.deleteCondidacy);
router.put('/update/:id', condidacyController.updateCondidacy);

module.exports = router;
