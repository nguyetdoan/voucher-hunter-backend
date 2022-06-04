const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload");

// @route   POST api/upload
// @desc    Upload an image
// @access  Private

router.post("/", uploadController.upload);

router.delete("/:public_id", uploadController.destroy);

module.exports = router;
