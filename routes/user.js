const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middleware/auth")

// @route   POST api/user
// @desc    Register a user
// @access  Public

router.post("/", userController.register);

// @route   POST api/user/password
// @desc    Register a user
// @access  Public

router.put("/password", auth, userController.resetPassword);

module.exports = router;
