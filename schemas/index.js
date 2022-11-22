const { contactDbSchema, contactJoiSchemas } = require('./contactSchemas');
const { userDbSchema, userJoiSchemas } = require('./userSchemas');

module.exports = { userDbSchema, userJoiSchemas, contactDbSchema, contactJoiSchemas };
