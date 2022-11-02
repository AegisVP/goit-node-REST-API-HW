const { writeFile, readFile } = require('fs').promises;
const path = require('path');
const { success, failure } = require('./utils/generateReturnObject.js');

const defaultPath = path.resolve(process.env.DEFAULT_PATH || './db/contacts.json');
const fileEncoding = process.env.FILE_ENCODING || 'utf8';


const readData = async (filePath = defaultPath) => {
  try {
    const rawData = await readFile(filePath, fileEncoding);
    if (rawData) return success(JSON.parse(rawData));
    else return failure('Not found');
  } catch (error) {
    console.error(error);
    return failure(error);
  }
};

const writeData = async (fileContents = [], filePath = defaultPath) => {
  try {
    await writeFile(filePath, JSON.stringify(fileContents), fileEncoding);
    return success();
  } catch (error) {
    console.error(error);
    return failure(error);
  }
};

module.exports = { readData, writeData };
