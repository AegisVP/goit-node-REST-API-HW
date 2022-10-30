const db = require('./handleFile.js');
const CONF = require('./config.js');

function listContacts() {
  return db.readData();
}

function getContactById(id) {
  const contacts = db.readData();
  const contact = contacts.filter(contact => String(contact.id) === String(id));

  if (contact.length === 0) return null;
  return contact;
}

function deleteContact(id) {
  const contacts = db.readData();
  const newContactsList = contacts.filter(contact => String(contact.id) !== String(id));

  if (contacts.length === newContactsList.length) return 404;

  db.writeData(CONF.defaultPath, newContactsList);
  return 200;
}

function addContact(contact) {
  const contacts = db.readData();
  contacts.push(contact);

  db.writeData(CONF.defaultPath, contacts);
  return true;
}

function updateContact(id, contact) {
  const savedContactData = getContactById(id);
  if (savedContactData === null) return 404;

  const newContact = { ...savedContactData[0] };
  for (const field in contact) if (contact[field]) newContact[field] = contact[field];

  deleteContact(id);
  addContact(newContact);

  return newContact;
}

module.exports = { listContacts, getContactById, deleteContact, addContact, updateContact };
