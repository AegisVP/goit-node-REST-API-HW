const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { requestError } = require('../utils');
const { User } = require('../model');

async function registerUser(req, res, next) {
  const { username, email, password } = req.body;

  if (await User.findOne({ email })) return next(requestError(409, 'Email is already in use', 'Conflict'));

  const newUser = new User({ username, email, password });
  await newUser.cryptPassword();

  const savedUser = await newUser.save();
  return res.status(201).json(savedUser);
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return next(requestError(401, 'Unable to login', 'NoSuchUser'));
  
  if (!(await bcrypt.compare(password, user.password)))
    return next(requestError(401, 'Unable to login', 'WrongPassword'));

  const token = jwt.sign({ _id: user._id, email, subscription: user.subscription }, process.env.JWT_SECRET);

  return res.json({ token });
}

module.exports = { registerUser, loginUser };
