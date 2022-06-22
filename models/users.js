const { Schema, model } = require('mongoose');
const Joi = require('joi');

const schema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
  { timestamps: true }
);
const User = model('user', schema);

const schemaRegister = Joi.object({
  subscription: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});
const schemaLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { User, schemaRegister, schemaLogin };
