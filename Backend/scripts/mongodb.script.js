const mongoose = require("mongoose");
const DB = process.env.DB;
console.log(DB);

// Connect to MongoDB:
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});
