const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect Database

connectDB();

app.get("/", (_, res) =>
  res.json({ msg: "Welcome the the voucher hunter API..." })
);

app.use(express.json({ extended: false }));

// Define Routes

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
