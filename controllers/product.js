const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const User = require("../models/User");

const getProducts = async (req, res) => {
  let {
    size = 10,
    page = 1,
    search,
    category,
    order = "asc",
    sortBy,
    lte,
    gte,
  } = req.query;

  try {
    const products = await Product.find({});
    const sortField = [
      "category",
      "name",
      "price",
      "discount",
      "stock",
      "star",
      "date",
    ];

    let list = products;
    if (search) {
      const regex = new RegExp(search, "i");
      list = list.filter((product) => regex.test(product.name));
    }

    if (category) {
      const regex = new RegExp(category, "i");
      list = list.filter((product) => regex.test(product.category));
    }

    if (lte) {
      list = list.filter((product) => product.price < lte);
    }

    if (gte) {
      list = list.filter((product) => product.price > gte);
    }

    if (sortBy && sortField.includes(sortBy)) {
      list = list.sort((a, b) =>
        order === "asc" && a[sort] < b[sort]
          ? -1
          : order === "desc" && a[sort] > b[sort]
          ? -1
          : 1
      );
    }

    list = list.slice(size * (page - 1), size * page);
    let totalPages = Math.ceil(products.length / size);
    res.json({ list, totalItems: products.length, totalPages, page, size });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server error" });
  }
};

const getProductDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server error" });
  }
};

const addProduct = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (user.role !== "admin") {
    res.status(401).json({ msg: "Not authorized!" });
  }

  const {
    category,
    name,
    price,
    detail,
    discount,
    from,
    to,
    images,
    stock,
    star,
    updatedDate,
    date,
  } = req.body;

  try {
    const newProduct = new Product({
      category,
      name,
      price,
      detail,
      discount,
      from,
      to,
      images,
      stock,
      star,
      updatedDate,
      date,
    });

    const product = await newProduct.save();
    res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server Error" });
  }
};

const updateProduct = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (user.role !== "admin") {
    res.status(401).json({ msg: "Not authorized!" });
  }

  const {
    category,
    name,
    price,
    detail,
    discount,
    from,
    to,
    images,
    stock,
    star,
    updatedDate,
    date,
  } = req.body;
  const productFields = {};

  if (category) productFields.category = category;
  if (name) productFields.name = name;
  if (price) productFields.price = price;
  if (detail) productFields.detail = detail;
  if (discount) productFields.discount = discount;
  if (from) productFields.from = from;
  if (to) productFields.to = to;
  if (images) productFields.images = images;
  if (stock) productFields.stock = stock;
  if (star) productFields.star = star;
  if (updatedDate) productFields.updatedDate = updatedDate;
  if (date) productFields.date = date;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(401).json({ msg: "Not found" });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );

    await CartItem.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (user.role !== "admin") {
    res.status(401).json({ msg: "Not authorized!" });
  }

  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(401).json({ msg: "Not found" });
    }

    product = await Product.findByIdAndRemove(req.params.id);
    res.json({ msg: "Product remove" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

const deleteAllProduct = async (_, res) => {
  await Product.deleteMany({});
  return res.json({ msg: "Deleted!!" });
};

module.exports = {
  getProducts,
  getProductDetail,
  addProduct,
  updateProduct,
  deleteProduct,
  deleteAllProduct,
  getAllProducts,
};
