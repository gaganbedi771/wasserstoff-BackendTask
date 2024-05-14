const User = require("../models/user");

exports.create = async (data) => {
  try {
    console.log(data);
    return await User.create(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.get = async (username,role) => {
  try {
    return await User.findOne({ username,role });
  } catch (error) {
    throw error;
  }
};
