const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { requestError } = require('../utils');
const { User } = require('../model');

async function registerUser(req, res, next) {
  const { email } = req.body;

  if (await User.findOne({ email })) return next(requestError(409, 'Email is already in use', 'Conflict'));

  const newUser = new User(req.body);
  await newUser.cryptPassword();

  await newUser.save();
  return res.status(201).json({ user: { email, subscription: newUser.subscription } });
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return next(requestError(401, 'Unable to login', 'NoSuchUser'));

  if (!(await bcrypt.compare(password, user.password))) return next(requestError(401, 'Unable to login', 'WrongPassword'));

  const { _id, subscription } = user;
  const token = jwt.sign({ _id, email, subscription }, process.env.JWT_SECRET);
  await User.findByIdAndUpdate(_id, { token });

  return res.json({ token, user: { email, subscription } });
}

async function logoutUser(req, res, next) {
  const user = await User.findById(req.user._id);
  if (!user) return next(requestError(401, 'Not authorized', 'NoSuchUser'));

  await User.findByIdAndUpdate(req.user._id, { token: '' });

  return res.status(204).send();
}

async function currentUser(req, res, next) {
  const user = await User.findById(req.user._id);
  if (!user) return next(requestError(401, 'Not authorized', 'NoSuchUser'));

  return res.json({ email: user.email, subscription: user.subscription });
}

module.exports = { registerUser, loginUser, logoutUser, currentUser };
