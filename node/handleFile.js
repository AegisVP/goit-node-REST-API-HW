const fs = require('fs');
const CONF = require('./config.js');

const readData = (filePath = CONF.defaultPath) => {
  return JSON.parse(fs.readFileSync(filePath, CONF.fileEncoding));
};

const writeData = (filePath = CONF.defaultPath, fileContents = '') => {
  return fs.writeFileSync(filePath, JSON.stringify(fileContents), CONF.fileEncoding);
};

module.exports = { readData, writeData };
