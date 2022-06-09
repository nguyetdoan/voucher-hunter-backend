const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const register = require("../controllers/user");

// @route   POST api/user
// @desc    Register a user
// @access  Public

router.post("/", register);

module.exports = router;
