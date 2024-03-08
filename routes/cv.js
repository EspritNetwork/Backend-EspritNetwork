const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cvController");

router.post('/add', cvController.addCv);
router.get('/getall', cvController.getAllCvs);
router.get('/getbyid/:id', cvController.getCvById);
router.delete('/delete/:id', cvController.deleteCv);
router.put('/update/:id', cvController.updateCv);

module.exports = router;
