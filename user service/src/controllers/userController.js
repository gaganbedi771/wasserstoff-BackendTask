const userRepository = require("../repository/userRepository");
const {
  encrypt,
  comparePassword,
  jwtCreate,
  jwtVerify,
} = require("../utils/userHelper");
const { sendResponse } = require("../utils/response");

exports.signUp = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await encrypt(password);
  const userData = { username, password: hashedPassword, role };

  try {
    const user = await userRepository.create(userData);
    const message = user.role == "admin" ? "Admin created" : "User created";
    return sendResponse(res, 201, {}, true, message, {});
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      500,
      {},
      false,
      "Not able to create the user",
      error
    );
  }
};

exports.signIn = async (req, res) => {
  if (!req.body.role) {
    req.body.role = "user";
  }

  const { username, password, role } = req.body;

  try {
    const getUser = await userRepository.get(username, role);

    if (!getUser) {
      return sendResponse(res, 404, {}, false, "User not found", {});
    }
    const isPasswordMatch = await comparePassword(password, getUser.password);
    if (!isPasswordMatch) {
      return sendResponse(res, 401, {}, false, "Password incorrect", {});
    }

    const token = jwtCreate({
      userId: getUser._id,
      username: getUser.username,
      role: getUser.role,
    });

    return sendResponse(res, 200, { token }, true, "Authenticated", {});
  } catch (error) {
    return sendResponse(res, 500, {}, false, "Internal server error", error);
  }
};

exports.authenticate = (req, res) => {
  const token = req.headers.authorization;
  const isVerified = jwtVerify(token);
  if (!isVerified) {
    return sendResponse(res, 401, {}, false, "Invalid Token", {
      error: "Invalid token",
    });
  }
  return sendResponse(res, 200, isVerified, true, "Authenticated", {});
};
