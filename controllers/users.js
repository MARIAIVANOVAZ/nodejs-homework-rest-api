const userService = require('../services/userService');
const { schemaRegister, schemaLogin } = require('../models/users');

const registerUser = async (req, res, next) => {
  try {
    const { error } = schemaRegister.validate(req.body);
    if (error) {
      res.status(400).json({ message: error });
    }
    const user = await userService.registerUser(req.body);
    res.status(201).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
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
};
