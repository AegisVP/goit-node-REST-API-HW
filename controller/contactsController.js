
const { generateFailureData, createNotFoundHttpError } = require('../utils');
const { Contacts, defaultFavorite } = require('../model');

async function getContacts(_, res, next) {
  const contacts = await Contacts.find();

  return res.json(contacts);
}

async function createContact(req, res, next) {
  const { name, email, phone, favorite = defaultFavorite } = req.body;

  // create contact
  const savedContact = await Contacts.create({ name, email, phone, favorite });
  console.log(savedContact);

  if (savedContact) return res.status(201).send(savedContact);
}

async function getContactById(req, res, next) {
  const { id } = req.params;
  const contact = await Contacts.findById(id);

  console.log(contact);
  if (contact === null) {
    return next(createNotFoundHttpError());
  }

  return res.json(contact);
}

async function deleteContactById(req, res, next) {
  const { id } = req.params;
  const result = await Contacts.findByIdAndDelete(id);

  if (result === null) return next(generateNotFoundHttpError());

  return res.json(result);
}

async function updateContactById(req, res, next) {
  const { name, email, phone, favorite = defaultFavorite } = req.body;
  const { id } = req.params;

  const result = await Contacts.updateOne({ _id: id }, { name, email, phone, favorite });
  const { matchedCount } = result;

  if (matchedCount == 0) return next(generateNotFoundHttpError());
  return res.json({ _id: id, name, email, phone, favorite });
}

async function toggleFavorite(req, res, next) {
  const { id } = req.params;
  const { favorite = defaultFavorite } = req.body;

  // updating field "favorite"
  const result = await Contacts.updateOne({ _id: id }, { favorite });

  // checking if request matched no records
  const { matchedCount } = result;
  if (matchedCount == 0) return next(generateNotFoundHttpError());

  // getting other fields from database
  const contact = await Contacts.findById(id);
  console.log(contact);

  // returning user object
  return res.json(contact);
}

module.exports = {
  getContacts,
  createContact,
  getContactById,
  deleteContactById,
  updateContactById,
  toggleFavorite,
};
