const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User"); 



const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Vérifier si le token est fourni
      if (!token) {
        return res.status(401).json({ error: "Token not provided" });
      }

      // Vérifier la signature du token pour s'assurer qu'il est valide
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          console.error(err);
          return res.status(401).json({ error: "Not authorized, invalid token" });
        } else {
          // Si le token est valide, vérifier si l'utilisateur associé existe
          const user = await User.findById(decoded.id).select("-password");
          if (!user) {
            return res.status(401).json({ error: "Valid token, but user not found" });
          }
          
          // Si l'utilisateur existe, ajoutez-le à req.user et passez à la prochaine étape
          req.user = user;
          next();
        }
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ error: "Token not provided" });
  }
});
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Admin");
  }
};
module.exports = { protect, admin };
