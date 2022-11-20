const Joi = require('joi');

const { generateSuccessData, generateFailureData } = require('../utils/generateReturnObject');
const { Contacts, defaultFavorite } = require('../model/contactsModel');

const joiValidateName = Joi.string().alphanum().min(1);
const joiValidateEmail = Joi.string().email();
const joiValidatePhone = Joi.string().min(5);
const joiValidateFavorite = Joi.boolean();

async function getContacts(_, res) {
  const contacts = await Contacts.find();

  return res.json(generateSuccessData(contacts));
}

async function createContact(req, res) {
  const { name, email, phone, favorite } = req.body;

  // validating fields
  let errMsg = [];
  if (joiValidateName.validate(name, { presence: 'required' }).error) errMsg.push('name');
  if (joiValidateEmail.validate(email, { presence: 'required' }).error) errMsg.push('email');
  if (joiValidatePhone.validate(phone, { presence: 'required' }).error) errMsg.push('phone');
  if (joiValidateFavorite.validate(favorite).error) errMsg.push('favorite');

  // if one or more validations fail, generate error message and return
  if (errMsg.length > 0) {
    const delim = errMsg.length === 2 ? ' and ' : ', ';
    const ending = errMsg.length > 1 ? 's' : '';
    const errorMessageString = `Error validating the ${errMsg.join(delim)} field${ending}`;
    return res.status(400).send(generateFailureData(errorMessageString));
  }

  // create contact
  const savedContact = await Contacts.create({ name, email, phone, favorite });

  return res.status(201).send(generateSuccessData(savedContact));
}

async function getContactById(req, res) {
  const { id } = req.params;
  const contact = await Contacts.findById(id);

  if (contact === null) return res.status(404).json(generateFailureData());

  return res.json(generateSuccessData(contact));
}

async function deleteContactById(req, res) {
  const { id } = req.params;
  const result = await Contacts.findByIdAndDelete(id);

  if (result === null) return res.status(404).json(generateFailureData());

  return res.json(generateSuccessData(result));
}

async function updateContactById(req, res) {
  const { name, email, phone, favorite } = req.body;
  const { id } = req.params;

  //Validating fields
  let errMsg = [];
  if (joiValidateName.validate(name, { presence: 'required' }).error) errMsg.push('name');
  if (joiValidateEmail.validate(email, { presence: 'required' }).error) errMsg.push('email');
  if (joiValidatePhone.validate(phone, { presence: 'required' }).error) errMsg.push('phone');
  if (joiValidateFavorite.validate(favorite, { presence: 'required' }).error) errMsg.push('favorite');

  if (errMsg.length > 0) {
    const delim = errMsg.length === 2 ? ' and ' : ', ';
    const ending = errMsg.length > 1 ? 's' : '';
    const errorMessageString = `Error validating the ${errMsg.join(delim)} field${ending}`;
    return res.status(400).send(generateFailureData(errorMessageString));
  }

  const result = await Contacts.updateOne({ _id: id }, { name, email, phone, favorite });
  const { matchedCount } = result;

  if (matchedCount == 0) return res.status(404).json(generateFailureData('No records matched'));
  return res.status(200).json({ _id: id, name, email, phone, favorite });
}

async function toggleFavorite(req, res) {
  const { id } = req.params;
  const { favorite } = req.body;

  // validating field "favorite"
  if (joiValidateFavorite.validate(favorite, { presence: 'required' }).error)
    return res.status(400).send(generateFailureData('Error validating field favorite'));

  // updating field "favorite"
  const result = await Contacts.updateOne({ _id: id }, { favorite });

  // checking if request matched no records
  const { matchedCount } = result;
  if (matchedCount == 0) return res.status(404).json(generateFailureData('No records matched'));

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
