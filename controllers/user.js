const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
  const error = validationResult(req.body);

  if (!error.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
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
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

const resetPassword = async (req, res) => {
   const {currentPassword, newPassword} = req.body;
   const user = await User.findById(req.user.id);

   if (!user) {
    return res.status(403).json({msg: "Not authorized!!"})
  }
   
   try {
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Your password is not correct." });
    }

    const salt = await bcrypt.genSalt(10);
    const secret = await bcrypt.hash(newPassword, salt);

  
    const newUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: {password: secret} }
    )

    return res.json({user: newUser})
  } catch(err) {
    console.log(err)
    return res.status(500).json({msg: "Server Error"})
  }
}

const updateUser = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(400).json({msg: "Not authorized!"});
  }

  const {image, fullName} = req.body;
  const updateField = {}

  if (image) updateField.image = image;
  if (fullName) updateField.fullName = fullName;

  const newUser = await User.findByIdAndUpdate(req.user.id, {
    $set: updateField,
    new: true
  });



}

module.exports = {
  register,
  resetPassword
};
