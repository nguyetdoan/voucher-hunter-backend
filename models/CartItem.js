const mongoose = require("mongoose");

const CartItem = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    refs: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    refs: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: String,
  },
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },
  images: [{ type: String }],
  stock: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("cartItem", CartItem);
