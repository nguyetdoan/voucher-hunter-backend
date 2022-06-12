const mongoose = require("mongoose");
//You will get the error "Invalid schema configuration:
// `model` is not a valid type" if you omit .schema at the end of the import
const CartItem = require("./CartItem").schema;

const Order = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    refs: "User",
  },
  cart: [CartItem],
  information: {
    type: Object,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", Order);
