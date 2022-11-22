const { model } = require('mongoose');
const { userDbSchema } = require('../schemas');

const User = model('user', userDbSchema);

module.exports = { User };
