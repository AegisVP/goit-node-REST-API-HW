const mongoose = require('mongoose');
const { contactDbSchema } = require('../schemas');

const Contacts = mongoose.model('contacts', contactDbSchema);

module.exports = {
  Contacts,
};
