const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const meta = require("../configs/meta.json");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "https://farm-favor.vercel.app");
  next();
});
// Parse cookies:
app.use(cookieParser());

// Parse body:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing files
// Cors:
// app.use(cors({ origin: meta.dev_host, credentials: true }));
app.use(cors({ origin: meta.host, credentials: true }));

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});

module.exports = app;
