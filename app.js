const express = require('express');
const morgan = require('morgan');
const contactsRouter = require('./routes/contactsRouter');

const app = express();

// add middlewares
app.use(morgan('tiny'));
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(`app error: ${err.message}, ${err.name}`);

  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
  
  return res.status(500).json({
    message: 'Internal server error',
  });
});

// define /api/contacts route
app.use('/api/contacts', contactsRouter);

app.use('/', (_, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

module.exports = { app };
