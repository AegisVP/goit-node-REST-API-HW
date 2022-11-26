const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');
const { requestError, createDefaultAvatar, imageResize } = require('../utils');
const { User } = require('../model');

async function registerUser(req, res, next) {
  const { email } = req.body;

  if (await User.findOne({ email })) return next(requestError(409, 'Email is already in use', 'Conflict'));

  const newUser = new User(req.body);
  newUser.avatarURL = await createDefaultAvatar(email);
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
  await User.findByIdAndUpdate(req.user._id, { token: '' });

  return res.status(204).send();
}

async function currentUser(req, res, next) {
  return res.json({ email: req.user.email, subscription: req.user.subscription });
}

async function updateSubscription(req, res, next) {
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(req.user._id, { subscription }, { new: true });

  return res.json({ email: result.email, subscription: result.subscription });
}

const uploadAvatar = async (req, res, next) => {
  let avatarFileName = req.avatarFileName;

  fs.rm(`${process.env.AVATAR_PATH}${req.user.avatarURL}`).catch(() => {
    return;
  });

  await imageResize(avatarFileName);
  await fs.rename(`${process.env.UPLOAD_PATH}${avatarFileName}`, `${process.env.AVATAR_PATH}${avatarFileName}`);

  await User.findByIdAndUpdate(req.user._id, { avatarURL: avatarFileName });
  res.json({ avatarURL: avatarFileName });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscription,
  uploadAvatar,
};
