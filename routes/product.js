const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const productController = require("../controllers/product");

// @route    GET api/products
// @desc     Get all users products
// @access   Private

router.get("/", productController.getProducts);

// @route    GET api/products
// @desc     Get all users products
// @access   Private

router.get("/:id", productController.getProductDetail);

// @route    POST api/products
// @desc     Add new product
// @access   Private

router.post("/", auth, productController.addProduct);

// @route    PUT api/products/:id
// @desc     Update Product
// @access   Private

router.put("/:id", auth, productController.updateProduct);

// @route    DELETE api/products/:id
// @desc     Delete Product
// @access   Private

router.delete("/:id", auth, productController.deleteProduct);
router.delete("/", productController.deleteAllProduct);

module.exports = router;
