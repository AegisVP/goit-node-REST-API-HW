const mongoose = require('mongoose');

const defaultFavorite = false;

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: defaultFavorite,
    required: true,
  },
});

const Contacts = mongoose.model('contacts', contactSchema);

module.exports = {
  Contacts,
  defaultFavorite,
};
