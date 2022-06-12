const Address = require("../models/Address");

const getAddress = async (req, res) => {
  const userId = req.user.id;

  try {
    const address = await Address.findOne({ userId });

    return res.json({ address });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ msg: "Server error" });
  }
};

const addAddress = async (req, res) => {
  const addressInfo = await Address.findOne({
    userId: req.user.id,
  });

  const { firstName, lastName, address, city, district, phoneNumber } =
    req.body;

  try {
    if (!addressInfo) {
      const newAddressInfo = new Address({
        firstName,
        lastName,
        address,
        city,
        district,
        phoneNumber,
        userId: req.user.id,
      });

      await newAddressInfo.save()
      return res.json(newAddressInfo)
    }

    const updatdeAddress = await Address.findOneAndUpdate({userId: req.user.id}, {
      $set: req.body,
      new: true
    })

    await updatdeAddress.save();
    return res.status(200).json(updatdeAddress);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ msg: "Server Error" });
  }
};


module.exports = {
  getAddress,
  addAddress,
};
