const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
// Load env file
dotenv.config({ path: "./config/config.env" });

// Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");

// Connect to database.
connectDB();

// Initializing app
const app = express();

// Body parser
app.use(express.json());

// Adding cookie parser
app.use(cookieParser());

// Dev request logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// File uploadind middleware.
app.use(fileupload());

// Set static folder.
app.use(express.static(path.join(__dirname, "public")));

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);

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
