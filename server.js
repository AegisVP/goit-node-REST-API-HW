require('dotenv').config();
const { DB_HOST, SERVER_PORT = 8080 } = process.env;

const { mailInterface } = require('./utils');
const { app } = require('./app');

async function connectMongoose() {
  const mongoose = require('mongoose');

  if (!DB_HOST) throw new Error('DB_HOST not defined!');

  await mongoose.connect(DB_HOST);
  console.log(`Connected to MongoDB`);
}

function connectMail() {
  mailInterface.verify();
}

async function main() {
  try {
    connectMail();
    connectMongoose();

    app.listen(SERVER_PORT, () => {
      console.log(`Server is listening: http://127.0.0.1:${SERVER_PORT}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
