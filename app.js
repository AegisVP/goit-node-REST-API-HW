const express = require('express')
const morgan = require('morgan')
const contactsRouter = require('./routes/contactsRouter')

const app = express()

// add middlewares
app.use(morgan('tiny'))
app.use(express.json())

// define /api/contacts route
app.use('/api/contacts', contactsRouter)

app.use('/', (_, res) => {
  return res.status(404).json({ message: 'Not Found' })
})

module.exports = { app }
