const axios = require("axios");
const { sendResponse } = require("../utils/response");

exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const response = await axios.get(
      "http://localhost:3001/user/authenticate",
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.data.success) {
      // req.user = response.data.data;
      // console.log(req.user) //giving proper output
      
      req.headers.userid = response.data.data.userId;
      req.headers.username = response.data.data.username;
      req.headers.role = response.data.data.role;
      next();
    }
  } catch (error) {
    console.log(error);
    return sendResponse(res, 401, {}, false, "Invalid Token", {
      error: "Invalid token",
    });
  }
};

// console.log(req.user)
