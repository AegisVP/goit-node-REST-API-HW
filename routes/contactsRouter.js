const contactsRouter = require('express').Router();
const { contactJoiSchemas } = require('../schemas');

const { validationBody } = require('../middlewares');
const { contactsController } = require('../controller');
const { tryCatchWrapper } = require('../utils');

contactsRouter.get('/', tryCatchWrapper(contactsController.getContacts));
contactsRouter.get('/:id', tryCatchWrapper(contactsController.getContactById));
contactsRouter.post('/', validationBody(contactJoiSchemas.addSchema), tryCatchWrapper(contactsController.createContact));
contactsRouter.put('/:id', validationBody(contactJoiSchemas.addSchema), tryCatchWrapper(contactsController.updateContactById));
contactsRouter.patch('/:id/favorite', validationBody(contactJoiSchemas.favoriteSchema), tryCatchWrapper(contactsController.toggleFavorite));
contactsRouter.delete('/:id', tryCatchWrapper(contactsController.deleteContactById));

module.exports = contactsRouter;
