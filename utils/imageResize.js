const Jimp = require('jimp');
const newSize = 250;

module.exports = async imagePath => {
  const fullImagePath = `${process.env.UPLOAD_PATH}${imagePath}`;
  
  const image = await Jimp.read(fullImagePath);
  image
    .resize(newSize, newSize) // resize
    .quality(60) // set JPEG quality
    .write(fullImagePath); // save

  return;
};
