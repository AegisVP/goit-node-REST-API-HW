const db = require('./handleFile.js');
const { success, failure } = require('./utils/generateReturnObject.js');

let contacts = [];

const listContacts = async () => {
  const res = await db.readData();

  if (res.status === 'success') {
    contacts = res.data;
    return success(res.data);
  } else {
    contacts = [];
    return failure([]);
  }
};

const getContactById = async id => {
  if (contacts.length <= 0) await listContacts();

  const contact = contacts.filter(contact => String(contact.id) === String(id));

  if (contact.length > 0) {
    return success(contact);
  } else {
    return failure('Not found');
  }
};

const addContact = async contact => {
  if (contacts.length <= 0) await listContacts();

  try {
    contacts.push(contact);
    return success(await db.writeData(contacts));
  } catch (error) {
    console.error(error);
    return failure(error);
  }
};

const updateContact = async (id, newContactData) => {
  if (contacts.length <= 0) await listContacts();

  const contactIndex = contacts.findIndex(contact => String(contact.id) === String(id));
  if (contactIndex < 0) return failure('Not found');

  const contact = contacts[contactIndex];

  for (const field in contacts[contactIndex]) {
    if (newContactData[field]) contact[field] = newContactData[field];
  }

  contacts.splice(contactIndex, 1, contact);

  try {
    await db.writeData(contacts);
    return success(contacts[contactIndex]);
  } catch (error) {
    console.error(error);
    return failure(error);
  }
};

const deleteContact = async id => {
  if (contacts.length <= 0) await listContacts();

  const contactIndex = contacts.findIndex(contact => String(contact.id) === String(id));
  if (contactIndex < 0) return failure('Not found');

  try {
    const deletedContact = contacts[contactIndex];
    contacts.splice(contactIndex, 1);

    await db.writeData(contacts);
    return success(deletedContact);
  } catch (error) {
    console.error(error);
    return failure(error);
  }
};

module.exports = { listContacts, getContactById, addContact, deleteContact, updateContact };
