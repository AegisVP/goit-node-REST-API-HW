const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const PNG = require('png-stream');
const JPG = require('jpg-stream');
const ColorTransform = require('color-transform');

module.exports = inputFile => {
  const [fileName, fileExt] = typeof inputFile === 'string' ? inputFile.split('.') : inputFile;
  const inputFilePath = path.resolve(`./public/avatars/${inputFile}`);
  const outputFilePath = path.resolve(`./public/avatars/${fileName}.jpg`);

  setTimeout(() => {
    fs.createReadStream(inputFilePath)
      .pipe(new PNG.Decoder())
      .pipe(new ColorTransform('rgb'))
      .pipe(new JPG.Encoder({}))
      .pipe(fs.createWriteStream(outputFilePath));

    setTimeout(async () => {
      await fsp.unlink(inputFilePath);
    });
  });
  return `${fileName}.jpg`;
};
