const express = require("express");
const {
  CreateBootcamp,
  UpdateBootcamp,
  getBootcamps,
  getBootcamp,
  DeleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamps");
const advancedResults = require("../middleware/advancedResult");

// Include other resourses router.
const courseRouter = require("./courses");

const router = express.Router();

// Route Protection.
const { protect, authorize } = require("../middleware/auth");

// Reroute into other resource router.
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance/:unit").get(getBootcampsInRadius);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), CreateBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), UpdateBootcamp)
  .delete(protect, authorize("publisher", "admin"), DeleteBootcamp);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

module.exports = router;
