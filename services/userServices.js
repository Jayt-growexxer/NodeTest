const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Create User
exports.createUser = async (data) => {
  try {
    const { name, email, password, confirmPassword, userType } = data;

    if (!name || !email || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }
    if (password !== confirmPassword) {
      throw new Error("Password and Confirm Password do not match");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists with this email");
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      userType,
    });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "90d",
    });

    return { user, token };
  } catch (error) {
    console.error("Error in createUser:", error.message);
    throw error;
  }
};

// Sign in User
exports.signin = async (data) => {
  try {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error("Please enter email and password");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "90d",
    });

    return { user, token };
  } catch (error) {
    console.error("Error in signin:", error.message);
    throw error;
  }
};
