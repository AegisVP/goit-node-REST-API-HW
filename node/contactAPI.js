const db = require('./handleFile.js');
const { generateSuccessData, generateFailureData } = require('./utils/generateReturnObject.js');

let contacts = [];

const listContacts = async () => {
  const res = await db.readData();

  if (res.status === 'success') {
    contacts = res.data;
    return generateSuccessData(res.data);
  } else {
    contacts = [];
    return generateFailureData([]);
  }
};

const getContactById = async id => {
  if (contacts.length <= 0) await listContacts();

  const contact = contacts.filter(contact => String(contact.id) === String(id));

  if (contact.length > 0) {
    return generateSuccessData(contact);
  } else {
    return generateFailureData('Not found');
  }
};

const addContact = async contact => {
  if (contacts.length <= 0) await listContacts();

  try {
    contacts.push(contact);
    return generateSuccessData(await db.writeData(contacts));
  } catch (error) {
    console.error(error);
    return generateFailureData(error);
  }
};

const updateContact = async (id, newContactData) => {
  if (contacts.length <= 0) await listContacts();

  const contactIndex = contacts.findIndex(contact => String(contact.id) === String(id));
  if (contactIndex < 0) return generateFailureData('Not found');

  const contact = contacts[contactIndex];

  for (const field in contacts[contactIndex]) {
    if (newContactData[field]) contact[field] = newContactData[field];
  }

  contacts.splice(contactIndex, 1, contact);

  try {
    await db.writeData(contacts);
    return generateSuccessData(contacts[contactIndex]);
  } catch (error) {
    console.error(error);
    return generateFailureData(error);
  }
};

const deleteContact = async id => {
  if (contacts.length <= 0) await listContacts();

  const contactIndex = contacts.findIndex(contact => String(contact.id) === String(id));
  if (contactIndex < 0) return generateFailureData('Not found');

  try {
    const deletedContact = contacts[contactIndex];
    contacts.splice(contactIndex, 1);

    await db.writeData(contacts);
    return generateSuccessData(deletedContact);
  } catch (error) {
    console.error(error);
    return generateFailureData(error);
  }
};

module.exports = { listContacts, getContactById, addContact, deleteContact, updateContact };
