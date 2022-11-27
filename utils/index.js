module.exports = {
  tryCatchWrapper: require('./tryCatchWrapper'),
  requestError: require('./requestError'),
  getHash: require('./getHash'),
  imageResize: require('./imageResize'),
  createDefaultAvatar: require('./createDefaultAvatar'),
  // mailInterface: require('./nodemailer'),
  mailInterface: require('./sendgrid'),
};
