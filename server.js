const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Load env file
dotenv.config({ path: "./config/config.env" });

// Route files
const bootcamps = require("./routes/bootcamps");

// Connect to database.
connectDB();

// Initializing app
const app = express();

// Body parser
app.use(express.json());

// Dev request logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);

// For Error Handling.
app.use(errorHandler);

PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on PORT ${process.env.PORT}`
      .yellow.bold
  )
);

// Handle unhandled promise rejections.
process.on("unhandledRejection", (err, promise) => {
  console.log("Error : ".red, err.message);
  // Close server and exit process.
  server.close(() => process.exit(1));
});
