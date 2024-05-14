const { sendResponse } = require("../utils/response");

exports.isAdmin = (req, res, next) => {
  const role = req.headers.role;
  if (!role) {
    return sendResponse(res, 400, {}, false, "No role found", {
      error: "No role found",
    });
  }
  if (role !== "admin") {
    return sendResponse(res, 403, {}, false, "Access denied", {
      error: "User is not an admin",
    });
  }
  next();
};
