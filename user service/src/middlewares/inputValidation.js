const { sendResponse } = require("../utils/response");

exports.validateCreateUserInput = (req, res, next) => {
  const { username, password, role } = req.body;
  if (!username || typeof username !== "string" || username.trim() === "") {
    return sendResponse(res, 400, {}, false, "Check Username", {
      error: "Invalid username",
    });
  }

  if (!password || typeof password !== "string" || password.trim() === "") {
    return sendResponse(res, 400, {}, false, "Check password type", {
      error: "Invalid password type",
    });
  }

  if (role && !["user", "admin"].includes(role)) {
    return sendResponse(res, 400, {}, false, "Check role", {
      error: "Invalid role",
    });
  }

  next();
};


