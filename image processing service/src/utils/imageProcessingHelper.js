const {
  ComputerVisionClient,
} = require("@azure/cognitiveservices-computervision");
const { ApiKeyCredentials } = require("@azure/ms-rest-js");
const {
  AZURE_API_key,
  AZURE_ENDPOINT,
  BINDING_KEY_DATA,
  UPDATE_QUEUE,
} = require("../config/server_config");
const credentials = new ApiKeyCredentials({
  inHeader: { "Ocp-Apim-Subscription-Key": AZURE_API_key },
});
const client = new ComputerVisionClient(credentials, AZURE_ENDPOINT);
const { getChannel, publishMessage } = require("../utils/messageQueue");

const getAnnotations = async (url) => {
  try {
    const result = await client.describeImage(url);
    // console.log("Detected objects:", result.tags);
    return result.tags;
  } catch (error) {
    console.error("Error detecting objects:", error);
    throw error;
  }
};

exports.processImage = async (url, id) => {
  try {
    console.log(url,id)
    const annotations = await getAnnotations(url);
    console.log(annotations);
    const message = {
      annotations,
      id,
    };
    await sendMessageToQueue(BINDING_KEY_DATA, UPDATE_QUEUE, message);
    return;
  } catch (error) {
    console.log(error);

   
  }
};

async function sendMessageToQueue(queue_binding_key, queue_name, message) {
  const channel = getChannel();
  await publishMessage(queue_binding_key, JSON.stringify(message), queue_name);
  return;
}
