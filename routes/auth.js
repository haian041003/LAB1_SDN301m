/*const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Account = require('../model/account');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use a strong secret in production

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newAccount = new Account({ username, password });
    await newAccount.save();
    res.status(201).send('Account created');
  } catch (error) {
    res.status(400).send('Error creating account');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const account = await Account.findOne({ username });
  if (!account) {
    return res.status(400).send('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, account.password);
  if (!isMatch) {
    return res.status(400).send('Invalid credentials');
  }

  const token = jwt.sign({ id: account._id, username: account.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
*/