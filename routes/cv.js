const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cvController");

router.post("/add", cvController.addCv);
router.get("/getall", cvController.getAllCvs);
router.get("/getbyid/:id", cvController.getCvById);
router.get("/getCvByUserId/:id", cvController.getCvByUserId);
router.delete("/delete/:id", cvController.deleteCv);
router.put("/update/:id", cvController.updateCv);
router.post("/upload/image", cvController.uploadImageCv);

router.post("/detecterfautes", async (req, res) => {
  const texte = req.body.texte;
  try {
    const fautes = await cvController.detecterFautes(texte);
    res.send(fautes);
  } catch (error) {
    console.error(
      "Erreur lors de la détection des fautes dans le texte :",
      error
    );
    res
      .status(500)
      .send(
        "Une erreur est survenue lors de la détection des fautes dans le texte."
      );
  }
});

module.exports = router;
