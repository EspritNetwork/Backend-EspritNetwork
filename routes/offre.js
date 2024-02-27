const express = require("express");
const router = express.Router();
const offreController = require("../controllers/offreController");

router.post('/add', offreController.addOffre);
router.get('/getall', offreController.getAllOffres);
router.get('/getbyidUser/:id', offreController.getOfferByIdUser)
router.get('/getbyid/:id', offreController.getOffreById);
router.delete('/delete/:id', offreController.deleteOffre);
router.put('/update/:id', offreController.updateOffre);

module.exports = router;
