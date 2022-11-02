const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { listContacts, getContactById, addContact, updateContact, deleteContact } = require('../contactAPI.js');
const { message, failure } = require('../utils/generateReturnObject.js');

const joiValidateName = Joi.string().alphanum().min(1);
const joiValidateEmail = Joi.string().email();
const joiValidatePhone = Joi.string().min(5);

const doReturn = (result, res) => {
  if (result.status === 'success') return res.status(200).send(result.data);
  else return res.status(404).send(message('Not found'));
};

router.get('/', async (_, res) => doReturn(await listContacts(), res));

router.get('/:id', async (req, res) => doReturn(await getContactById(req.params.id), res));

router.delete('/:id', async (req, res) => doReturn(await deleteContact(req.params.id), res));

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

  try {
    await addContact(newContact);
    return res.status(201).send(newContact);
  } catch (error) {
    return res.status(500).send(failure(`Server error: ${error}`));
  }
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

  try {
    const result = await updateContact(id, { name, email, phone });

    if (result.status === 'success') return res.status(200).send(result.data);
    return res.status(404).send(message('Not found'));
  } catch (error) {
    return res.status(500).send(failure(`Server error: ${error}`));
  }
});

router.patch('/:id', async (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.params;

  if (joiValidateName.validate(name).error) return res.status(400).send(message('Error validating name field'));
  if (joiValidateEmail.validate(email).error) return res.status(400).send(message('Error validating email field'));
  if (joiValidatePhone.validate(phone).error) return res.status(400).send(message('Error validating phone field'));

  try {
    const result = await updateContact(id, { name, email, phone });

    if (result.status === 'success') return res.status(200).send(result.data);
    else return res.status(404).send(message('Not found'));
  } catch (error) {
    return res.status(500).send(failure(`Server error: ${error}`));
  }
});

module.exports = router;
