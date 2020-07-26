const express = require("express");
const {
  CreateBootcamp,
  UpdateBootcamp,
  getBootcamps,
  getBootcamp,
  DeleteBootcamp,
  getBootcampsInRadius,
} = require("../controllers/bootcamps");

// Include other resourses router.
const courseRouter = require("./courses");

const router = express.Router();

// Reroute into other resource router.
router.use("/:bootcampId/courses", courseRouter);

router.route("/radius/:zipcode/:distance/:unit").get(getBootcampsInRadius);

router.route("/").get(getBootcamps).post(CreateBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(UpdateBootcamp)
  .delete(DeleteBootcamp);

module.exports = router;
