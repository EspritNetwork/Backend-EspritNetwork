const express = require("express");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../Middleware/AuthMiddleware.js");
const generateToken = require("../utils/generateToken.js");
const User = require("../models/User.js");
const mailgun = require("mailgun-js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

/*
Le but des fonctions async/await est de simplifier l'utilisation synchrone des promesses
 et d'opérer sur des groupes de promesses. De la même façon que les promesses sont semblables à
  des callbacks structurés, async/await est semblable à la combinaison des générateurs et des promesses.
*/


// LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user.verified){
      res.status(401);
      throw new Error("User not verified");
    }
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else if (!user.verfied) {
      throw new Error("verify your contact information");
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

userRouter.post(
  "/password-reset",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const apiKey = "1f6aa33dab2c7e0350074b230b56a2d2-162d1f80-66f0a1de";
    const domain = "sandboxc7824dced682496eb2a77fe4823e50cb.mailgun.org";
    const mg = new mailgun({ apiKey, domain });
    const token = generateToken(user.id);
    await User.findOneAndUpdate({ _id: user.id }, { token });
    mg.messages()
      .send({
        from: `test@${domain}`,
        to: email,
        subject: "Reset Your Pasword ",
        text: `http://localhost:3000/PasswordReset/${token}`,
      })
      .then((res) => console.log(res))
      .catch((err) => console.err(err));

    return res.status(200).send({ message: "Successfully sent mail!" });
  })
);

userRouter.post(
  "/verify/:token",
  asyncHandler(async (req, res) => {
    const token = req.params.token;
    if (!token) {
      return res.status(401).send({ message: "Something bad happened" });
    }
    const payload = jwt.decode(token);
    console.log(payload);
    const email = payload.id;
    const user = await User.findOne({ email });

    if (!user.token == token) {
      return res.status(401).send({ message: "Something bad happened" });
    }
    user.verified=true
    user.verifyToken=""
    await user.save()

    return res.status(200).send({ message: "Successfully verified" });
  })
);

userRouter.post(
  "/password-reset/:id",
  asyncHandler(async (req, res) => {
    const { password } = req.body;
    const id = req.params.id;
    console.log(id);
    const payload = jwt.decode(id);
    const userId = payload.id;
    console.log(userId);
    const user = await User.findOne({ _id: userId });
    const patt=new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)

      if(!patt.test(password)){
      res.status(400);
      throw new Error("password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters");
    }

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (user.token != id) {
      return res.status(404).send({ message: "invalid token" });
    }
    const salt = await bcrypt.genSalt(10);

    if(!patt.test(password)){
      res.status(400);
      throw new Error("password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters");
    }

    await User.findOneAndUpdate(
      { _id: userId },
      { password: await bcrypt.hash(password, salt), token: "" }
    );

    return res.status(200).send({ message: "Successfully reset password" });
  })
);

// REGISTER
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password ,adresseC, confirmPassword } = req.body;

    const userExists = await User.findOne({ email });
    const patt=new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)
   
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    if (password!=confirmPassword) {
      res.status(400);
      throw new Error("Passwords does not match");
    }

    if(!patt.test(password)){
      res.status(400);
      throw new Error("password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters");
    }
    const apiKey = "1f6aa33dab2c7e0350074b230b56a2d2-162d1f80-66f0a1de";
    const domain = "sandboxc7824dced682496eb2a77fe4823e50cb.mailgun.org";
    const mg = new mailgun({ apiKey, domain });
    const token = generateToken(email);

    const user = await User.create({
      name,
      email,
      password,
      adresseC,
      confirmPassword,
      verfied: false,
      verifyToken: token,
    });

    if (user) {
      mg.messages()
        .send({
          from: `test@${domain}`,
          to: email,
          subject: "Verify account",
          text: `http://localhost:3000/activate/${token}`,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      res.status(201).json({
        message:"Please verify mail"
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE
userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }


      
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// GET ALL USER ADMIN
userRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

userRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.json({ message: "User deleted" });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  })
);

module.exports = userRouter;
