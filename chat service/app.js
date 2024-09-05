const express = require('express');
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("./kafka/consumer.js");
const app = express()
const socket = require('./helpers/socket.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

//cors
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_ADMIN_URL],
    credentials: true
}));

//routes
const chatRoutes = require("./routes/ChatRoutes.js")
app.use("/api/chat-service/v1/", chatRoutes);


// database connection
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error("db error ::: ", error));
db.once("open", () => {
    console.log("database connected...");
    const expressServer = app.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT}`)
    })
    
    socket(expressServer);
});