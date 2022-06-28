const userService = require('../services/userService');
const {
  schemaRegister,
  schemaLogin,
  schemaVerify,
} = require('../models/users');
const emailService = require('../services/email.service');
const updateUserService = require('../services/updateUser.service');
const { createError } = require('../errors/errors');

const registerUser = async (req, res, next) => {
  try {
    const { error } = schemaRegister.validate(req.body);
    if (error) {
      res.status(400).json({ message: error });
    }
    const user = await userService.registerUser(req.body);
    console.log(user);
    await emailService.sendEmail(user.email, user.verificationToken);
    res.status(201).json({
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

const confirmUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await updateUserService.findUser({ verificationToken });

    if (!user) {
      throw createError(404, 'User not found');
    }

    const result = await updateUserService.updateUser(user._id, {
      verify: true,
      verificationToken: null,
    });
    return res.status(200).json({
      code: 200,
      message: 'Verification successful',
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const resend = async (req, res, next) => {
  try {
    const { error } = schemaVerify.validate(req.body);
    if (error) {
      res.status(400).json({ message: 'missing required field email' });
    }
    const { email } = req.body;
    const user = await updateUserService.findUser({ email });
    if (!user) {
      throw createError(404, 'User was not found');
    }
    if (user.verify) {
      throw createError(400, 'Verification has already been passed');
    }

    await emailService.sendEmail(user.email, user.verificationToken);
    res.status(200).json({ message: 'Verification email sent' });
  } catch (e) {
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { error } = schemaLogin.validate(req.body);
    if (error) {
      res.status(400).json({ message: error });
    }
    const token = await userService.loginUser(req.body);
    res.json(token);
  } catch (error) {
    next(error);
  }
};
const logoutUser = async (req, res, next) => {
  try {
    await userService.logoutUser(req.user._id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
const currentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  confirmUser,
  resend,
};
