const express = require("express");
const {
  PORT,
  DB_STRING,
  BINDING_KEY_DATA,
  UPDATE_QUEUE,
} = require("../src/config/server_config");
const mongoose = require("mongoose");
const { Image } = require("./models/image");
const imageRoutes = require("./routes/imageRoute");
const { createChannel, subscribeMessage } = require("./utils/messageQueue");
const { updateAnnotations } = require("./utils/updateAnnotation");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(imageRoutes);

dbConnect();

async function dbConnect() {
  try {
    await createChannel();
    await mongoose.connect(DB_STRING, { dbName: "visionmark_image_db" });
    await subscribeMessage(
      updateAnnotations,
      BINDING_KEY_DATA,
      UPDATE_QUEUE
    );
    app.listen(PORT, () => {
      console.log("Data service ruuning on port", PORT);
    });
  } catch (error) {
    console.log(error);
  }
}
