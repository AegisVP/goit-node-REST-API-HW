const mongoose = require('mongoose');
const { contactDbSchema } = require('../schemas');

module.exports = mongoose.model('contacts', contactDbSchema);
