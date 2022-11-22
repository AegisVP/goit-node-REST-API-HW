const jwt = require('jsonwebtoken');
const { User } = require('../model');
const { requestError } = require('../utils');

async function authService(req, res, next) {
  // try {
    if (!req?.headers['authorization']) return next(requestError(401, 'No Authorization header', 'NoAuthHeader'));

    const [authType, token] = req.headers['authorization'].split(' ');
    const decodedUser = jwt.decode(token);

    const dbUser = await User.findById(decodedUser._id);
    if (!dbUser) return next(requestError(401, 'Token not valid', 'NoTokenUser'));

    if (dbUser.token !== token) {
      await User.findByIdAndUpdate(dbUser._id, { token: '' });
      return next(requestError(401, 'Token not valid', 'TokenMismatch'));
    }

    req.user = dbUser;

    return next();
  // } catch (error) {
  //   console.error(error.message);
  //   return next(requestError(500, 'Error', 'authServiceError'));
  // }
}

function authMid(req, res, next) {
  console.log("i'm alive!");
  return next();
}

module.exports = { authService, authMid };
