const bcrypt = require('bcrypt');

async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  console.log('result:', result);
  return result;
}

module.exports = { comparePassword };
