const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
// require("./nodemailer");
require('./kafkaConfig')

//cors
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));


app.listen(process.env.PORT, () => console.log("server listening on port " + process.env.PORT))