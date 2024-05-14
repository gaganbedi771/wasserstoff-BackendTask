const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/server_config");

exports.encrypt = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw error;
  }
};

exports.comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw error;
  }
};

exports.jwtCreate = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

exports.jwtVerify = (token) => {
  try {
    const isVerified = jwt.verify(token, JWT_SECRET);
    return {
      userId: isVerified.userId,
      username: isVerified.username,
      role: isVerified.role,
    };
  } catch (error) {
    return null;
  }
};
