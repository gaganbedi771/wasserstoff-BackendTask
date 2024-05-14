require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DB_STRING: process.env.DB_STRING,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SERCET: process.env.CLOUD_API_SERCET,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  BINDING_KEY_PROCESSING: process.env.BINDING_KEY_PROCESSING,
  BINDING_KEY_DATA: process.env.BINDING_KEY_DATA,
  Processing_QUEUE: process.env.Processing_QUEUE,
  UPDATE_QUEUE: process.env.UPDATE_QUEUE,
};
