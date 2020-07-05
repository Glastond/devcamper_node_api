// @desc    Get all bootcamps.
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Shows all the bootcamps." });
};

// @desc    Get single bootcamp.
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Get bootcamp with Id = ${req.params.id}.`,
  });
};

// @desc    Create new bootcamp.
// @route   POST /api/v1/bootcamps/
// @access  Private
exports.CreateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Creates a new bootcamp.`,
  });
};

// @desc    Update new bootcamp.
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.UpdateBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Update bootcamp with Id = ${req.params.id}.`,
  });
};

// @desc    Delete new bootcamp.
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.DeleteBootcamp = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Delete Bootcamp with Id = ${req.params.id}.`,
  });
};
