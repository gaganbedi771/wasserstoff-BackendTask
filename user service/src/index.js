const express = require("express");
const { PORT, DB_STRING } = require("../src/config/server_config");
const mongoose = require("mongoose");
const userRoutes=require("./routes/user_route");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

dbConnect();

async function dbConnect() {
  try {
    await mongoose.connect(DB_STRING,{ dbName: "visionmark_user_db" });
    app.listen(PORT, () => {
      console.log("User service ruuning on port", PORT);
    });
  } catch (error) {
    console.log(error);
  }
}
