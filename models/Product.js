const mongoose = require("mongoose");
const Heart = require("./Heart").schema

const ProductSchema = mongoose.Schema({
  category: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  detail: {
    type: String,
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
  star: {
    type: Number,
    default: 0,
  },
  updatedDate: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  purchases: {
    type: Number,
    default: 0
  },
  isLoved: {
    type: Boolean,
    default: false
  }
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
