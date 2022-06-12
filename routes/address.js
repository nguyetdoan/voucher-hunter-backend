const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const addressController = require("../controllers/address");

// @route    GET api/address
// @desc     Get all users address
// @access   Private

router.get("/", auth, addressController.getAddress);

// @route    POST api/address
// @desc     Post user address
// @access   Private

router.post("/", auth, addressController.addAddress);

module.exports = router;
