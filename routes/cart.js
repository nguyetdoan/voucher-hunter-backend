const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const cartController = require("../controllers/cart");

// @route    GET api/cart
// @desc     Get all users cart
// @access   Private

router.get("/", auth, cartController.getCart);

// @route    POST api/cart
// @desc     Add new cart item
// @access   Private

router.post("/", auth, cartController.addToCart);

// @route    PUT api/cart/:id
// @desc     Update cart item
// @access   Private

router.put("/:id", auth, cartController.updateItem);

// @route    DELETE api/cart/:id
// @desc     Delete cart item
// @access   Private

router.delete("/:id", auth, cartController.deleteItem);

// @route    DELETE api/cart
// @desc     Delete Cart
// @access   Private

router.delete("/", auth, cartController.deleteCart);

module.exports = router;
