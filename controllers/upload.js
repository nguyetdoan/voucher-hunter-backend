const { cloudinary } = require("../utils/cloudinary");

// Upload image only admin can use
const upload = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      format: "png",
      resouce_type: "image",
    });

    res.json(uploadResponse.url);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

// Delete Image only admin can use
const destroy = (req, res) => {
  try {
    const { public_id } = req.params;
    if (!public_id) return res.status(400).json({ msg: "No images selected." });

    cloudinary.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json({ msg: "Deleted image." });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = { upload, destroy };
