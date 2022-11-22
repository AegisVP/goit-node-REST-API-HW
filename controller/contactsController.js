const { createNotFoundHttpError } = require('../utils');
const { Contacts, defaultFavorite } = require('../model');

async function getContacts(_, res) {
  const contacts = await Contacts.find();

  return res.json(contacts);
}

async function createContact(req, res) {
  const { name, email, phone, favorite = defaultFavorite } = req.body;

  // create contact
  const savedContact = await Contacts.create({ name, email, phone, favorite });

  if (savedContact) return res.status(201).send(savedContact);
}

async function getContactById(req, res, next) {
  const { id } = req.params;
  const contact = await Contacts.findById(id);

  if (!contact) return next(createNotFoundHttpError());

  return res.json(contact);
}

async function deleteContactById(req, res, next) {
  const { id } = req.params;
  const contact = await Contacts.findByIdAndDelete(id);

  if (!contact) return next(createNotFoundHttpError());

  return res.json(contact);
}

async function updateContactById(req, res, next) {
  const { name, email, phone, favorite = defaultFavorite } = req.body;
  const { id } = req.params;
  const contact = await Contacts.findByIdAndUpdate(id, { name, email, phone, favorite }, { new: true });

  if (!contact) return next(createNotFoundHttpError());

  return res.json(contact);
}

async function toggleFavorite(req, res, next) {
  const { id } = req.params;
  const { favorite = defaultFavorite } = req.body;

  // updating field "favorite"
  const contact = await Contacts.findByIdAndUpdate(id, { favorite }, { new: true });

  // checking if request matched no records
  if (!contact) return next(createNotFoundHttpError());

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
