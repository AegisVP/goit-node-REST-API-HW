const express = require('express');
const app = express();
const morgan = require('morgan');
const contactsRouter = require('./routes/contactsRouter.js');

app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.listen(8088, () => {
  console.log('Server is listening: http://127.0.0.1:8088');
});
