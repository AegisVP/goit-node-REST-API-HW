const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { listContacts, getContactById, addContact, updateContact, deleteContact } = require('../contactAPI.js');
const { message } = require('../utils/generateReturnObject.js');

const joiValidateName = Joi.string().alphanum().min(1);
const joiValidateEmail = Joi.string().email();
const joiValidatePhone = Joi.string().min(5);

const doReturn = (result, res) => {
  if (result.status === 'success') return res.status(200).send(result.data);
  else return res.status(404).send(message('Not found'));
};

router.get('/', async (_, res) => doReturn(await listContacts(), res));

// router.get('/', async (_, res) => {
//   const result = await listContacts();
//
//   if (result.status === 'success') return res.status(200).send(result.data);
//   else return res.status(404).send(message('Not found'));
// });

router.get('/:id', async (req, res) => doReturn(await getContactById(req.params.id), res));

// router.get('/:id', async (req, res) => {
//   const result = await getContactById(req.params.id);
//
//   if (result.status === 'success') return res.status(200).send(result.data);
//   else return res.status(404).send(message('Not found'));
// });

router.delete('/:id', async (req, res) => doReturn(await deleteContact(req.params.id), res));

// router.delete('/:id', async (req, res) => {
//   const result = await deleteContact(req.params.id);
//
//   if (result.status === 'success') return res.status(200).send(result.data);
//   else return res.status(404).send(message('Not found'));
// });

router.post('/', async (req, res) => {
  const { name, email, phone } = req.body;
  const id = Date.now().toString();
  const newContact = { id, name, email, phone };

  let errMsg = [];
  if (joiValidateName.validate(name, { presence: 'required' }).error) errMsg.push('name');
  if (joiValidateEmail.validate(email, { presence: 'required' }).error) errMsg.push('email');
  if (joiValidatePhone.validate(phone, { presence: 'required' }).error) errMsg.push('phone');

  if (errMsg.length > 0) {
    const delim = errMsg.length === 2 ? ' and ' : ', ';
    const ending = errMsg.length > 1 ? 's' : '';
    return res.status(400).send(message(`Error validating the ${errMsg.join(delim)} field${ending}`));
  }

  await addContact(newContact);
  return res.status(200).send(newContact);
});

router.put('/:id', async (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.params;

  let errMsg = [];
  if (joiValidateName.validate(name, { presence: 'required' }).error) errMsg.push('name');
  if (joiValidateEmail.validate(email, { presence: 'required' }).error) errMsg.push('email');
  if (joiValidatePhone.validate(phone, { presence: 'required' }).error) errMsg.push('phone');

  if (errMsg.length > 0) {
    const delim = errMsg.length === 2 ? ' and ' : ', ';
    const ending = errMsg.length > 1 ? 's' : '';
    return res.status(400).send(message(`Error validating the ${errMsg.join(delim)} field${ending}`));
  }

  const result = await updateContact(id, { name, email, phone });
  console.log('result:', result);

  if (result.status === 'success') return res.status(200).send(result.data);
  return res.status(404).send(message('Not found'));
});

router.patch('/:id', async (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.params;

  if (joiValidateName.validate(name).error) return res.status(400).send(message('Error validating name field'));
  if (joiValidateEmail.validate(email).error) return res.status(400).send(message('Error validating email field'));
  if (joiValidatePhone.validate(phone).error) return res.status(400).send(message('Error validating phone field'));

  const result = await updateContact(id, { name, email, phone });
  console.log('result:', result);

  if (result.status === 'success') return res.status(200).send(result.data);
  else return res.status(404).send(message('Not found'));
});

module.exports = router;
