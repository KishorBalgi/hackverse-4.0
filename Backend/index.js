const expressApp = require("./scripts/express.script.js");
// Dot env:
require("dotenv").config();

// Connect to database:
require("./scripts/mongodb.script.js");

// Error Handler:
const { globalErrorHandler } = require("./controllers/errorController.js");

// Routes:
const authRoute = require("./routes/authRoute.js");
const ticketRoute = require("./routes/ticketRoute.js");
const userRoute = require("./routes/userRoute.js");

expressApp.get("/", (req, res) => {
  res.send("<h1>This is the Advance NodeJS API</h1>");
});

expressApp.use("/api/auth", authRoute);
expressApp.use("/api/verify", ticketRoute);
expressApp.use("/api/user", userRoute);

expressApp.use(globalErrorHandler);
