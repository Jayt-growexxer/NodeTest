const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    userType: { type: String, enum: ["Admin", "User"], default: "User" },
  },
  { timestamps: true }
);

// Hash password before saving

module.exports = mongoose.model("User", userSchema);
