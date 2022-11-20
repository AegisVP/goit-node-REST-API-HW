const contactsRouter = require('express').Router();

const contactsController = require('../controller/contactsController');
const { tryCatchWrapper } = require('../utils/tryCatchWrapper');

contactsRouter.get('/', tryCatchWrapper(contactsController.getContacts));
contactsRouter.post('/', tryCatchWrapper(contactsController.createContact));
contactsRouter.get('/:id', tryCatchWrapper(contactsController.getContactById));
contactsRouter.delete('/:id', tryCatchWrapper(contactsController.deleteContactById));
contactsRouter.put('/:id', tryCatchWrapper(contactsController.updateContactById));
contactsRouter.patch('/:id/favorite', tryCatchWrapper(contactsController.toggleFavorite));

module.exports = contactsRouter;
