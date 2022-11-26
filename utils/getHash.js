const md5 = require('blueimp-md5');
const MD5_REGEX = /^[0-9a-f]{32}$/;

module.exports = email => {
  email = typeof email === 'string' ? email.trim().toLowerCase() : 'unspecified';
  return email.match(MD5_REGEX) ? email : md5(email);
}
