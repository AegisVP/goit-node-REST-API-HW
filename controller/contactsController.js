const Joi = require('joi');

const { generateFailureData, createNotFoundHttpError } = require('../utils');
const { Contacts, defaultFavorite } = require('../model/contactsModel');

const contactValidateSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).required(),
  favorite: Joi.boolean(),
});

async function getContacts(_, res, next) {
  const contacts = await Contacts.find();

  return res.json(contacts);
}

async function createContact(req, res, next) {
  const { name, email, phone, favorite = defaultFavorite } = req.body;
  const newContact = { name, email, phone, favorite };

  // validating fields
  const { error } = contactValidateSchema.validate(newContact);
  if (error) return res.status(400).send(generateFailureData(error.message));

  // create contact
  const savedContact = await Contacts.create(newContact);

  return res.status(201).send(savedContact);
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

  //Validating fields
  const { error } = contactValidateSchema.validate(newContact);
  if (error) return res.status(400).send(generateFailureData(error.message));

  const result = await Contacts.updateOne({ _id: id }, { name, email, phone, favorite });
  const { matchedCount } = result;

  if (matchedCount == 0) return next(generateNotFoundHttpError());
  return res.status(200).json({ _id: id, name, email, phone, favorite });
}

async function toggleFavorite(req, res, next) {
  const { id } = req.params;
  const { favorite = defaultFavorite } = req.body;

  // validating field "favorite"
  if (joiValidateFavorite.validate(favorite, { presence: 'required' }).error)
    return res.status(400).send(generateFailureData('Error validating field favorite'));

  // updating field "favorite"
  const result = await Contacts.updateOne({ _id: id }, { favorite });

  // checking if request matched no records
  const { matchedCount } = result;
  if (matchedCount == 0) return next(generateNotFoundHttpError());

  // getting other fields from database
  const contact = await Contacts.findById(id);
  console.log(contact);

  // returning user object
  return res.status(200).json(contact);
}

module.exports = {
  getContacts,
  createContact,
  getContactById,
  deleteContactById,
  updateContactById,
  toggleFavorite,
};
