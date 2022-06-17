const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const heartController = require("../controllers/heart");

// @route    GET api/order
// @desc     Toggle like of product
// @access   Private

router.post("/", auth, heartController.toggleHeart);

module.exports = router;