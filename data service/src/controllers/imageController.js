const imageRepository = require("../repository/imageRepository");
const { uploadToCDN } = require("../utils/imageHelper");
const { sendResponse } = require("../utils/response");

const { getChannel, publishMessage } = require("../utils/messageQueue");
const {
  BINDING_KEY_PROCESSING,
  Processing_QUEUE,
} = require("../config/server_config");

exports.storeImage = async (req, res) => {
  // console.log(req.user); //giving undefined
  const userId = req.headers.userid;
  const username = req.headers.username;
  const role = req.headers.role;
  const image = req.file;
  try {
    const cdnResponse = await uploadToCDN(req.file.path);

    const dataToStore = {
      imageDetails: {
        name: req.file.originalname,
        url: cdnResponse.url,
      },
      user: {
        userId: userId,
        username: username,
        role: role,
      },
    };

    const data = await imageRepository.create(dataToStore);
    console.log(data._id);
    const message = { url: cdnResponse.url, id: data._id };
    await sendMessageToQueue(BINDING_KEY_PROCESSING, Processing_QUEUE, message);
    return sendResponse(res, 201, dataToStore, true, "File Uploaded", {});
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      500,
      {},
      false,
      "Not able to upload the file",
      error
    );
  }
};

async function sendMessageToQueue(queue_binding_key, queue_name, data) {
  const channel = getChannel();
  await publishMessage(queue_binding_key, JSON.stringify(data), queue_name);
  return;
}

exports.getAll = async (req, res) => {
  try {
    const allData = await imageRepository.getAll();
    return sendResponse(res, 201, allData, true, "Data Fetched", {});
  } catch (error) {
    console.log(error);
    return sendResponse(
      res,
      500,
      {},
      false,
      "Not able to fetch the details",
      error
    );
  }
};
