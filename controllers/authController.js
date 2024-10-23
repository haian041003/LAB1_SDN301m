const { Account } = require('../model/model');
const jwt = require('jsonwebtoken');

const authController = {
  login: async (req, res) => {
    const redirect = req.body.redirect;
    try {
      const account = await Account.findOne({
        userName: req.body.userName,
        password: req.body.password,
      });
      if (account) {
        const token = authController.generateToken(req.body.userName);
        if (redirect?.length) {
          res.cookie('x-auth-token', token);
          res.redirect(redirect);
          return;
        }
        res.json({ message: 'Login successfully', token });
      } else {
        if (redirect?.length) {
          res.redirect('/dashboard/login?error=true');
          return;
        }
        res.status(404).json({ message: 'Login failed' });
      }
    } catch (error) {
      if (redirect?.length) {
        res.redirect('/dashboard/login?error=true');
        return;
      }
      res.json({ message: error });
    }
  },
  register: async (req, res) => {
    if (!req.body.userName || !req.body.password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // check if the account is already in the database
    const accountExist = await Account.findOne({ userName: req.body.userName });
    if (accountExist) {
      return res.status(400).json({ message: 'Account already exists' });
    }
    const account = new Account({
      userName: req.body.userName,
      password: req.body.password,
    });
    try {
      const savedAccount = await account.save();
      res.json(savedAccount);
    } catch (error) {
      res.json({ message: error });
    }
  },

  generateToken: (userName) => {
    return jwt.sign({ userName }, process.env.JWT_SECRET, { expiresIn: '1h' });
  },

  createAdminAccount: async () => {
    const admin = await Account.findOne({ userName: 'admin' });
    if (admin) {
      return;
    }
    const account = new Account({
      userName: 'admin',
      password: '123456',
    });
    try {
      await account.save();
      console.log('Admin account created successfully');
    } catch (error) {
      console.log('Admin account already exists');
    }
  },
};

authController.createAdminAccount();

module.exports = authController;
