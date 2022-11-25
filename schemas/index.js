const { contactDbSchema, contactJoiSchemas } = require('./contactSchemas');
const { userDbSchema, userJoiSchemas } = require('./userSchemas');
const { avatarStorage } = require('./avatarStorage');

module.exports = {
  userDbSchema,
  userJoiSchemas,
  contactDbSchema,
  contactJoiSchemas,
  avatarStorage,
};
