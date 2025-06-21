const express = require("express");
const { connectDB } = require("./lib/db");
const app = require("./lib/socket").app; // Importing the app from socket.js
const server = require("./lib/socket").server; // Importing the server from socket.js
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

// middleware
app.use(express.json());
app.use(cors(
  {
    origin: ["http://localhost:3000","https://social-media-web-tan.vercel.app", "https://your-production-url.com"],
  }
));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(morgan("dev"));

// routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));


const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  connectDB();
});
