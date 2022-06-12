const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const orderController = require("../controllers/order");

// @route    GET api/order
// @desc     Get all users orders
// @access   Private

router.get("/", auth, orderController.getUserOrders);

// @route    GET api/order/all
// @desc     Get all users orders
// @access   Private

router.get("/all", auth, orderController.getAllOrders);

// @route    GET api/order/:id
// @desc     Get all order detail
// @access   Private

router.get("/:id", auth, orderController.getOrderDetail);

// @route    POST api/order
// @desc     Add new order
// @access   Private

router.post("/", auth, orderController.addOrder);

// @route    DELETE api/order
// @desc     Delete all user order
// @access   Private

router.delete("/", auth, orderController.deleteOrder);

module.exports = router;
