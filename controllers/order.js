const Order = require("../models/order");
const User = require("../models/User");

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({
      date: -1,
    });
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getAllOrders = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (user.role !== "admin") {
    res.status(401).json({ msg: "Not authorized!" });
  }

  try {
    const orders = await Order.find({}).sort({
      date: -1,
    });
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const orderId = req.params.id;

    const order = await CartItem.findById(orderId);

    if (!order) {
      return res.status(401).json({ msg: "Not found" });
    }

    if (user.role !== "admin" && order.userId.toString() !== req.user.id) {
      return res.status(401).json("Not authorized!");
    }

    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const addOrder = async (req, res) => {
  const { items, totalPrice, information } = req.body;

  try {
    const newOrder = new Order({
      items,
      totalPrice,
      information,
      userId: req.user.id,
    });

    await newOrder.save();
    return res.status(201).json(newOrder);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

module.exports = {
  getUserOrders,
  getAllOrders,
  addOrder,
  getOrderDetail,
};
