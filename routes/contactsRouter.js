const contactsRouter = require('express').Router();
const contactSchemas = require('../schemas');

const { validationBody } = require('../middlewares');
const contactsController = require('../controller');
const { tryCatchWrapper } = require('../utils');

contactsRouter.get('/', tryCatchWrapper(contactsController.getContacts));
contactsRouter.post('/', validationBody(contactSchemas.addSchema), tryCatchWrapper(contactsController.createContact));
contactsRouter.get('/:id', tryCatchWrapper(contactsController.getContactById));
contactsRouter.delete('/:id', tryCatchWrapper(contactsController.deleteContactById));
contactsRouter.put('/:id', validationBody(contactSchemas.addSchema), tryCatchWrapper(contactsController.updateContactById));
contactsRouter.patch('/:id/favorite', validationBody(contactSchemas.favoriteSchema), tryCatchWrapper(contactsController.toggleFavorite));

module.exports = contactsRouter;
