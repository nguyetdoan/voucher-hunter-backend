const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const register = require("../controllers/user");

// @route   POST api/user
// @desc    Register a user
// @access  Public

router.post(
  "/",
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password 6 or more characters").isLength({
      min: 6,
    }),
  ],
  register
);

module.exports = router;
