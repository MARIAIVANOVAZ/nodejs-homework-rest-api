const { Schema, model } = require('mongoose');
const Joi = require('joi');
const gravatar = require('gravatar');
const { v4 } = require('uuid');

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
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {}, true);
      },
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: function () {
        return v4();
      },
      required: true,
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
const schemaVerify = Joi.object({
  email: Joi.string().required(),
});

module.exports = { User, schemaRegister, schemaLogin, schemaVerify };
