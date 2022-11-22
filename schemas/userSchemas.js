const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userDbSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userDbSchema.method('cryptPassword', async function () {
  this.password = await bcrypt.hash(this.password, 10);
  return;
});

module.exports = { userDbSchema };
