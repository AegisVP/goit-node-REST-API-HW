const jwt = require('jsonwebtoken');
const { User } = require('../model');
const { requestError } = require('../utils');

module.exports = async (req, res, next) => {
  if (!req?.headers['authorization']) return next(requestError(401, 'No Authorization header', 'NoAuthHeader'));

  const [authScheme, token] = req.headers['authorization'].split(' ');
  if (authScheme !== 'Bearer') return next(requestError(401, 'Auth scheme unsupported', 'InvalidHeader'));
  if (!token) return next(requestError(401, 'Token not valid', 'InvalidHeader'));

  const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedUser?._id || !decodedUser?.email) return next(requestError(401, 'Token not valid', 'TokenInvalid'));

  const dbUser = await User.findById(decodedUser._id);
  if (!dbUser) return next(requestError(401, 'Token not valid', 'NoTokenUser'));

  if (dbUser.token !== token) {
    await User.findByIdAndUpdate(dbUser._id, { token: '' });
    return next(requestError(401, 'Token not valid', 'TokenMismatch'));
  }

  req.user = dbUser;

  return next();
};
