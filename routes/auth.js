const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authController = require("../controllers/auth");

require("dotenv").config();

// @route  GET api/auth
// @desc   Get logged in user
// @access Private

router.get("/", auth, authController.loadUser);

// @route  GET api/auth/admin
// @desc   Get logged in admin
// @access Private

router.get("/admin", auth, authController.loadAdmin);

// @route  POST api/auth
// @desc   Auth user & get token
// @access Public

router.post("/", authController.login);

// @route  POST api/auth/admin
// @desc   Auth user & get token
// @access Public

router.post("/", authController.loginAdmin);

router.post("/google", authController.googleAuth);

router.delete("/all", authController.deleteAllUser);

module.exports = router;
