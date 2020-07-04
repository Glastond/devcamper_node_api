const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "Shows all the bootcamps." });
});

router.get("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Get bootcamp with Id = ${req.params.id}.`,
  });
});

router.post("/", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Creates a new bootcamp.`,
  });
});

router.put("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Update bootcamp with Id = ${req.params.id}.`,
  });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Delete Bootcamp with Id = ${req.params.id}.`,
  });
});

module.exports = router;
