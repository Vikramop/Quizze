const express = require('express');
const router = express.Router();
const User = require('../schema/user.schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

router.get('/', (req, res) => {
  // throw new Error(' This is a forced error');
  res.send('login page');
});

router.post('/register', async (req, res) => {
  console.log('reqBODYYY', req.body);

  try {
    const { name, email, password, confirmPassword } = req.body;
    console.log('Parsed Data:', { name, email, password, confirmPassword });
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send.json('User already Exists');
    }
    // Server-side validation
    if (password !== confirmPassword) {
      return res.status(400).send.json({ message: 'Passwords do not match' });
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hash,
    });

    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.json({
      email: user.email,
      token,
    });
  } catch (e) {
    return new Error(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).send.json('User already Exists');
    }

    const validPass = bcrypt.compareSync(password, userExists.password);
    if (!validPass) {
      return res.status(400).send.json('email or password is wrong');
    }
    const token = jwt.sign({ _id: userExists._id }, process.env.TOKEN_SECRET);
    res.json({
      email: userExists.email,
      token,
    });
  } catch (e) {
    return new Error(e);
  }
});

module.exports = router;
