const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const domaineController = require("../controllers/domaineController");
=======
const domaineController = require("../controller/domaineController");
>>>>>>> cda636c082d628c8a149b9de53fe08bfcb1abd9c

router.post("/add", domaineController.addDomaine);
router.get("/getall", domaineController.getAllDomaines);
router.get("/getbyid/:id", domaineController.getDomaineById);
router.delete("/deleteAll", domaineController.deleteAllDomaine);

module.exports = router;
