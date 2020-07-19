const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars.
dotenv.config({ path: "./config/config.env" });

// Load models.
const Bootcamp = require("./models/Bootcamps");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files.
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

// Function for importing data into DB.
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Data Seeded...".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Function for deleting data from DB.
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Conditionally caling create or delete command.
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}