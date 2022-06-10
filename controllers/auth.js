const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const loadUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

const loadAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Not authorized!!" });
    }

    if (user.role !== "admin") {
      return res.status(400).json({ msg: "Not authorized!!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Your Password is Not Correct!!" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    console.log(user);
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ user, token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Email or Password!" })
    }

    if (!user.password) {
      return res.status(400).json({ msg: "Please login by Google!!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Email or Password!" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ user, token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

const googleAuth = async (req, res) => {
  const { idToken } = req.body;

  const ticket = await client.verifyIdToken({
    idToken,
    requiredAudience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { sub, email, name, picture } = payload;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ userId: sub, email, fullName: name, avatar: picture });
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ user, token });
        }
      );
    }

    const jwtPayload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      jwtPayload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

const deleteAllUser = async (req, res) => {
  await User.deleteMany({}), res.json({ msg: "Deleted!!" });
};

module.exports = {
  loadUser,
  login,
  loadAdmin,
  googleAuth,
  loginAdmin,
  deleteAllUser,
};
