const express = require("express");
const dotenv = require("dotenv");

// Load env file
dotenv.config({ path: "./config/config.env" });

const app = express();

PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on PORT ${process.env.PORT}`
  )
);
