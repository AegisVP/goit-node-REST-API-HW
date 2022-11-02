require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const contactsRouter = require('./routes/contactsRouter.js');
const serverPort = process.env.SERVER_PORT || 8080;

// add middlewares
app.use(morgan('tiny'));
app.use(express.json());

// define /api/contacts route
app.use('/api/contacts', contactsRouter);

// start the server
app.listen(serverPort, () => {
  console.log(`Server is listening: http://127.0.0.1:${serverPort}`);
});
