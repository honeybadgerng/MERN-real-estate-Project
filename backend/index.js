const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();

//Mongo DB connect
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () =>
  console.log("MongoDB sef don start")
);
//connect server

app.listen(process.env.PORT, () => console.log("Server don start"));
