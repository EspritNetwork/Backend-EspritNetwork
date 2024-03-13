const Test = require("../models/test");

async function addTest(req, res) {
  try {
    const { datetest, titre, duree, resultat,  user } = req.body;
    const test = new Test({ datetest, titre, duree, resultat,  user });
    await test.save();
    res.status(201).json({ message: "Test added successfully", test });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllTests(req, res) {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function getTestById(req, res) {
  try {
    const test = await Test.findById(req.params.id);
    res.status(200).json(test);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function deleteTest(req, res) {
  try {
    const deletedTest = await Test.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Test deleted successfully", test: deletedTest });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function updateTest(req, res) {
  try {
    const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Test updated successfully", test: updatedTest });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

module.exports = {
  addTest,
  getAllTests,
  getTestById,
  deleteTest,
  updateTest,
};
