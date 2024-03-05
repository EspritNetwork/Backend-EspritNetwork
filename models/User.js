const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: false,
    },
    password: {
      type: String,
      required: false,
    },
    confirmPassword: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["admin", "user", "staff"],
      default: "user",
      required: false,
    },
    token: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    verified: {
      type: Boolean,
      required: false,
      default: false,
    },
     
    googleId: {
      type: String,
      required: false,
    },
    secret: {
      type: String,
      required: false,
    },
    pic: {
      type: String,
      required: false,
    },
    verifyToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

// Login
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// Register
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
