const { writeFile, readFile } = require('fs').promises;
const { success, failure } = require('./utils/generateReturnObject.js');
const CONF = require('./config.js');

const readData = async (filePath = CONF.defaultPath) => {
  try {
    const rawData = await readFile(filePath, CONF.fileEncoding);
    if (rawData) return success(JSON.parse(rawData));
    else return failure('Not found');
  } catch (error) {
    console.error(error);
    return failure(error);
  }
};

const writeData = async (fileContents = [], filePath = CONF.defaultPath) => {
  try {
    await writeFile(filePath, JSON.stringify(fileContents), CONF.fileEncoding);
    return success();
  } catch (error) {
    console.error(error);
    return failure(error);
  }
};

module.exports = { readData, writeData };
