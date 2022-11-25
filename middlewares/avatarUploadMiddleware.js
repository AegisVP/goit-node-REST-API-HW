const multer = require('multer');
const { avatarStorage } = require('../schemas');

module.exports = multer({ storage: avatarStorage });