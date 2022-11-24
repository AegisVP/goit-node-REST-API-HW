const multer = require('multer');
const path = require('path');
const { getHash } = require('../utils');

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('./public/avatars'));
  },
  filename: (req, file, cb) => {
    const fileExt = String(file.originalname.split('.').pop()).toLocaleLowerCase();
    const savedFileName = `${getHash(req.user.email)}.${fileExt}`;

    cb(null, savedFileName);
    req.avatarFileName = savedFileName;
  },
});

module.exports = { avatarStorage };
