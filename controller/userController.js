const { createUser, signin } = require("../services/userServices.js");
const verifyToken = require("../middleware/protect");

exports.createUser = async (req, res) => {
  try {
    const { user, token } = await createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User successfully created",
      token,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { user, token } = await signin(req.body);
    res.status(200).json({
      // Changed 201 -> 200
      success: true,
      message: "User successfully logged in", // Fixed message
      token,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
