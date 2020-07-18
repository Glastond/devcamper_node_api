const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //   Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Bootcamp not found with ID of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //   Mongoose bad duplicate key value.
  if (err.code === 11000) {
    const message = `Duplicate key value Entered.`;
    error = new ErrorResponse(message, 400);
  }

  //   Mongoose Validation Error.
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
