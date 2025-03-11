const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return res
        .status(401)
        .json({ success: false, message: "User no longer exists" });
    }

    if (freshUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        success: false,
        message: "User recently changed password. Please log in again.",
      });
    }

    req.user = freshUser;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
