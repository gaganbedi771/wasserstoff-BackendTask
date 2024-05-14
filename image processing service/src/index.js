const express = require("express");
const { PORT,BINDING_KEY_PROCESSING,Processing_QUEUE} = require("../src/config/server_config");
const imagePrcessingRoutes = require("./routes/imageProcessingRoute");
const { createChannel,subscribeMessage } = require("./utils/messageQueue");
const {processImage} = require("./utils/imageProcessingHelper");
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(imagePrcessingRoutes);

startServer();

async function startServer() {
  try {
    await createChannel();
    await subscribeMessage(processImage,BINDING_KEY_PROCESSING,Processing_QUEUE);

    app.listen(PORT, () => {
      console.log("User service ruuning on port", PORT);
    });
  } catch (error) {
    console.log(error);
  }
}
