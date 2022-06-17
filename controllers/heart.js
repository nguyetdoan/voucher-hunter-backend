const Heart = require("../models/Heart");

const toggleHeart = async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.productId;

  try {
    const heart = await Heart.findOne({ productId, userId });
    
    if (heart) {
      await Heart.findByIdAndRemove(heart._id);
      return res.json({ msg: "Unlike!" });
    } else {
      const newHeart = new Heart({ productId, userId });
      await newHeart.save()
      return res.json({ msg: "Like!" });
    }
    
  } catch (err) {
    console.error(error);
  }
};

module.exports = {
  toggleHeart
}
