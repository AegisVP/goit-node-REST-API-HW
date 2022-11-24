const uploadAvatar = async (req, res, next) => {
  if (String(req.avatarFileName.split('.').pop()).toLocaleLowerCase() === 'png') req.avatarFileName = require('../utils/convertPngToJpg')(req.avatarFileName);

  res.json({ message: req.avatarFileName });
};

module.exports = { uploadAvatar };
