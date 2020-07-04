const express = require("express");
const dotenv = require("dotenv");

// Route files
const bootcamps = require("./routes/bootcamps");

// Load env file
dotenv.config({ path: "./config/config.env" });

// Initializing app
const app = express();

// Mount Routers
app.use("/api/v1/bootcamps", bootcamps);

PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on PORT ${process.env.PORT}`
  )
);
