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
  description: {
    type: String,
  },
  discount: {
    type: Number,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  images: [{ type: String, required: true }],
  stoke: {
    type: Number,
    required: true,
  },
  star: {
    type: Number,
    default: 0,
  },
  updatedDate: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
