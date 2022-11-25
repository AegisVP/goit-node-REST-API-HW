const fs = require('fs').promises;
const getHash = require('./getHash');

module.exports = async email => {
  const hash = getHash(email);
  const defaultAvatarPath = './utils/defaultAvatar.jpg';
  const userAvatarPath = `${process.env.AVATAR_PATH}${hash}.jpg`;
  
  await fs.copyFile(defaultAvatarPath, userAvatarPath);
  return `${hash}.jpg`;
};
