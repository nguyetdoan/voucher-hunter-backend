const CartItem = require("../models/CartItem");

const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await CartItem.find({ userId });

    const totalPrice = cart.reduce((total, current) => {
      if (
        current.discount &&
        +new Date(current.to) > +new Date() &&
        +new Date(current.from) < +new Date()
      ) {
        const discountPrice = current.price - (current.discount.split("%")[0] * current.price) / 100;
        return total + discountPrice * current.quantity;
      }

      return total + current.price * current.quantity;
    }, 0);

    const totalQuantity = cart.length;
    return res.json({ cart, totalPrice, totalQuantity });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ msg: "Server error" });
  }
};

const addToCart = async (req, res) => {
  const cartItem = await CartItem.findOne({
    userId: req.user.id,
    productId: req.body._id,
  });

  const { name, price, discount, from, to, images, stock, _id, quantity } =
    req.body;

  try {
    if (!cartItem) {
      const newCartItem = new CartItem({
        name,
        price,
        discount,
        from,
        quantity: +quantity,
        to,
        images,
        stock,
        productId: _id,
        userId: req.user.id,
      });

      await newCartItem.save();
      return res.status(200).json(newCartItem);
    }

    cartItem.quantity += +quantity;
    await cartItem.save();
    return res.json(cartItem);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ msg: "Server Error" });
  }
};

const updateItem = async (req, res) => {
  const cartItemId = req.params.id;
  const cartItem = await CartItem.findById(cartItemId);

  if (!cartItem) {
    return res.status(401).json({ msg: "Not found" });
  }

  if (cartItem.userId.toString() !== req.user.id) {
    return res.status(401).json("Not authorized!");
  }

  const { quantity } = req.body;
  const cartItemField = {};

  if (quantity) cartItemField.quantity = quantity;

  try {
    const cartItem = await CartItem.findByIdAndUpdate(
      req.params.id,
      { $set: cartItemField },
      { new: true }
    );

    return res.json(cartItem);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ msg: "Server Error" });
  }
};

const deleteItem = async (req, res) => {
  const cartItemId = req.params.id;

  const cartItem = await CartItem.findById(cartItemId);

  if (!cartItem) {
    return res.status(401).json({ msg: "Not found" });
  }

  if (cartItem.userId.toString() !== req.user.id) {
    return res.status(401).json("Not authorized!");
  }

  try {
    await CartItem.findByIdAndRemove(req.params.id);
    return res.json({ msg: "Item removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

const deleteCart = async (req, res) => {
  await CartItem.deleteMany({ userId: req.user.id });
  return res.json({ msg: "Deleted!!" });
};

module.exports = {
  getCart,
  addToCart,
  updateItem,
  deleteItem,
  deleteCart,
};
