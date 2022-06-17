const mongoose = require("mongoose");

const Heart = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    refs: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    refs: "Product",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("heart", Heart);
