const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Connect Database

connectDB();

app.get("/", (_, res) =>
  res.json({ msg: "Welcome the the voucher hunter API..." })
);

app.use(express.json({ extended: false, limit: "50 mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Define Routes
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/product", require("./routes/product"));
app.use("/api/upload", require("./routes/upload"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
