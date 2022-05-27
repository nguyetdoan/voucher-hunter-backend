const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authController = require("../controllers/auth");

// @route  GET api/auth
// @desc   Get logged in user
// @access Private

router.get("/", auth, authController.loadUser);

// @route  POST api/auth
// @desc   Auth user & get token
// @access Public

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authController.login
);

module.exports = router;
