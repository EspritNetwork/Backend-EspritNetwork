const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

router.post('/add', questionController.addQuestion);
router.get('/getall', questionController.getAllQuestions);
router.get('/getbyid/:id', questionController.getQuestionById);
router.delete('/delete/:id', questionController.deleteQuestion);
router.put('/update/:id', questionController.updateQuestion);

module.exports = router;
