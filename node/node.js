const express = require('express');
const app = express();
const contactAPI = require('./contactAPI.js');

app.get('/api/contacts', (req, res) => {
  const contacts = contactAPI.listContacts();
  res.status(200).send(contacts);
});

app.get('/api/contacts/:id', (req, res) => {
  const contact = contactAPI.getContactById(req.params.id);

  if (contact === null) res.status(404).send({ message: 'Not found' });
  else res.status(200).send(contact);
});

app.delete('/api/contacts/:id', (req, res) => {
  const result = contactAPI.deleteContact(req.params.id);

  if (result === 404) res.status(404).send({ message: 'Not found' });
  else res.status(200).send({ message: 'Contact deleted' });
});

app.use(express.json());

app.post('/api/contacts', (req, res) => {
  const { name, email, phone } = req.body;
  const id = Date.now();
  const newContact = { id, name, email, phone };
  let errMsg = [];

  if (!name) errMsg.push('name');
  if (!phone) errMsg.push('phone');
  if (!email) errMsg.push('email');

  if (errMsg.length > 0) {
    const delim = errMsg.length === 2 ? ' and ' : ', ';
    const ending = errMsg.length > 1 ? 's' : '';
    res.status(400).send({ message: `Missing required ${errMsg.join(delim)} field${ending}` });
  } else {
    contactAPI.addContact(newContact);
    res.status(200).send(newContact);
  }
});

//ToDo: Finish "editing contact" code
app.put('/api/contacts/:id', (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.params;

  if (!name && !phone && !email) {
    res.status(400).send({ message: 'Missing fields' });
  } else {
    const result = contactAPI.updateContact(id, { name, email, phone });
    if (result === 404) {
      res.status(404).send({ message: 'Not found' });
    } else {
      res.status(200).send(result);
    }
  }
});

app.listen(8088, () => {
  console.log('Server is listening: http://127.0.0.1:8088');
});
