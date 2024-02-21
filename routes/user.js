const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post('/add', userController.addUser);
router.get('/getall', userController.getAllUsers);
router.get('/getbyid/:id', userController.getUserById);
router.delete('/delete/:id', userController.deleteUser);
router.put('/update/:id', userController.updateUser);

module.exports = router;
