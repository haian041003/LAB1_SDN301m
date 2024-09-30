const { Account } = require("../model/model");
const jwt = require("jsonwebtoken");

const authController = {
  register: async (req, res) => {
    try {
      const newAccount = new Account({
        userName: req.body.userName,
        password: req.body.password,
      });
      const savedAccount = await newAccount.save();
      res.status(200).json(savedAccount);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  login: async (req, res) => {
    try {
      const account = await Account.findOne({ userName: req.body.userName });
      if (!account) return res.status(404).json("User not found");

      if (req.body.password !== account.password)
        return res.status(400).json("Wrong password");

      const token = jwt.sign({ id: account._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = authController;
