const {writeFileSync, readFileSync} = require('fs');
const CONF = require('./config.js');

const readData = (filePath = CONF.defaultPath) => {
  return JSON.parse(readFileSync(filePath, CONF.fileEncoding));
};

const writeData = (filePath = CONF.defaultPath, fileContents = '') => {
  return writeFileSync(filePath, JSON.stringify(fileContents), CONF.fileEncoding);
};

module.exports = { readData, writeData };
