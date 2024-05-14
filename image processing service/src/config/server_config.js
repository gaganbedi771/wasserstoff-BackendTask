require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  AZURE_ENDPOINT: process.env.AZURE_ENDPOINT,
  AZURE_API_key: process.env.AZURE_API_key,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  BINDING_KEY_PROCESSING: process.env.BINDING_KEY_PROCESSING,
  BINDING_KEY_DATA: process.env.BINDING_KEY_DATA,
  Processing_QUEUE: process.env.Processing_QUEUE,
  UPDATE_QUEUE: process.env.UPDATE_QUEUE,
};
