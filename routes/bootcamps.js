const express = require("express");
const {
  CreateBootcamp,
  UpdateBootcamp,
  getBootcamps,
  getBootcamp,
  DeleteBootcamp,
} = require("../controllers/bootcamps");

const router = express.Router();
router.route("/").get(getBootcamps).post(CreateBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(UpdateBootcamp)
  .delete(DeleteBootcamp);

module.exports = router;
