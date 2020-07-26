const path = require("path");
const Bootcamp = require("../models/Bootcamps");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
const { Query } = require("mongoose");

// @desc    Get all bootcamps.
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single bootcamp.
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc    Create new bootcamp.
// @route   POST /api/v1/bootcamps/
// @access  Private
exports.CreateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

// @desc    Update new bootcamp.
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.UpdateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // Checking if the Bootcamp exists.
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @desc    Delete bootcamp.
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.DeleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  // Checking if the Bootcamp exists.
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404)
    );
  }

  // The bootcamp is removed this way and findByIdAndDelete because the
  // cascade delete method for removing the related course won't work.
  bootcamp.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get bootcamps within a Radius.
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance/:unit
// @access  Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance, unit } = req.params;

  // Get lat/Lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calculate radius using radians
  // Divde dist by radius of Earth.
  // Earth Radius = 6378 km / 3963 miles
  const earthRadius = unit === "mi" ? 3963 : 6378;
  const radius = distance / earthRadius;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});

// @desc    Upload photo for bootcamp.
// @route   PUT /api/v1/bootcamps/:id/photo
// @access  Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  // Checking if the Bootcamp exists.
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with ID of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the file is a Photo.
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an Image file.`, 400));
  }

  // Check file size.
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an Image less than ${process.env.MAX_FILE_UPLOAD}.`,
        400
      )
    );
  }

  // Create custom file name.
  file.name = `${path.parse(file.name).name}_${bootcamp._id}${
    path.parse(file.name).ext
  }`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`problem with file upload`, 500));
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
