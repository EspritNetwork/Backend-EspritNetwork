const User = require("../models/user");

async function addUser(req, res) {
  try {
    const { nom, prenom, specialite, cin, email, password, image, adresse, téléphone, cv, status, role, nameC, adresseC, descriptionC, logoC } = req.body;
    const user = new User({ nom, prenom, specialite, cin, email, password, image, adresse, téléphone, cv, status, role, nameC, adresseC, descriptionC, logoC });
    await user.save();
    res.status(201).json({ message: "User added successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
