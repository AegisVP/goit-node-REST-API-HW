const { imageConvertFormat, imageResize } = require('../utils');

const uploadAvatar = async (req, res, next) => {
  const avatarFileName = req.avatarFileName;
  console.log(avatarFileName);
  // обробляємо файл
  await imageResize(avatarFileName);
  if (String(avatarFileName.split('.').pop()).toLocaleLowerCase() === 'png') req.avatarFileName = imageConvertFormat(avatarFileName);

  res.json({ message: req.avatarFileName });
};

module.exports = { uploadAvatar };
