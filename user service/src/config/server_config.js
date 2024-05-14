require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DB_STRING: process.env.DB_STRING,
  JWT_SECRET: process.env.JWT_SECRET,
};
