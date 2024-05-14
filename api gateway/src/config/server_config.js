require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  USER_SERVICE_ROUTE: process.env.USER_SERVICE_ROUTE,
  IMAGE_SERVICE_ROUTE: process.env.IMAGE_SERVICE_ROUTE,
};
