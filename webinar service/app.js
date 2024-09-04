const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const app = express();
require("./kafka/consumer")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(fileUpload());

//cors
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials: true
}));

//routes
const webinarRouter = require("./routes/webinarRoutes")
const audioRouter = require("./routes/audioRoutes");
app.use("/api/webinar-service/v1/", webinarRouter);
app.use("/api/v1/audio", audioRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    if(err.status){
        return res.status(err.status).json({message: err.message});
    }
	return res.status(500).json({ message: err ?? "Internal Server Error" });
});

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error("db error ::: ", error));
db.once("open", () => {
	console.log("database connected...");
	app.listen(process.env.PORT, () => {
		console.log("listening on port " + process.env.PORT);
	});
});