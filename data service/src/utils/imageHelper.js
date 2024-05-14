const { v2: cloudinary } = require("cloudinary");
const {
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SERCET,
} = require("../config/server_config");
const fs = require("fs");

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SERCET,
});

exports.uploadToCDN = async (filePath, fileName) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    return uploadResult;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw error;
  }
};
