const { processImage } = require("../utils/imageProcessingHelper");
const { sendResponse } = require("../utils/response");

const { getChannel, publishMessage } = require("../utils/messageQueue");
const {
  BINDING_KEY_PROCESSING,
  Processing_QUEUE,
} = require("../config/server_config");

exports.process = async (req, res) => {
  const url =
    "https://res.cloudinary.com/dfp0zjdlv/image/upload/v1715677969/wibrketwdahvz9qebyve.jpg";
  try {
    const annotations = await processImage(url);
    console.log(annotations);
    return sendResponse(res, 201, annotations, true, "Image Processed", {});
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
