const mongoose = require("mongoose");

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
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
