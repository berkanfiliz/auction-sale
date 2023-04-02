const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

const authControl = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(400).json({ success: false, message: "Token gerekli" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Yetkilendirilmemis islem" });
  }
};

module.exports = authControl;
