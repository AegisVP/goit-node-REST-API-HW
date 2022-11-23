const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const subscriptionTypes = ['starter', 'pro', 'business'];

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
      enum: subscriptionTypes,
      default: subscriptionTypes[0],
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

const addSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).alphanum().required(),
  subscription: Joi.string().valid(...subscriptionTypes),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const subscriptionSchema = Joi.object({
  _id: Joi.any().required(),
  subscription: Joi.string().valid(...subscriptionTypes).required(),
});

module.exports = { userDbSchema, userJoiSchemas: { addSchema, loginSchema, subscriptionSchema } };
