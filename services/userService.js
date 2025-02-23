const { User } = require('../models/users');
const { createError } = require('../errors/errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const registerUser = async userData => {
  const result = await User.findOne({ email: userData.email });
  if (result) {
    throw createError(409, 'Email in use');
  }

  const password = userData.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });
  return user;
};
// request validation
// if no user with login => 401
// else => verify password
// if wrong password => 401
// else generate jwt token and send token to the client
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, 'Email or password is wrong');
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw createError(401, 'Email or password is wrong');
  }
  const payload = {
    id: user._id,
    subscription: user.subscription,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await User.findByIdAndUpdate(user._id, { token });
  return { token };
};

const authenticateUser = async token => {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    const { id } = payload;
    const user = await User.findById(id);

    return user.token !== token ? null : user;
  } catch (e) {
    return null;
  }
};

const logoutUser = async id => {
  await User.findByIdAndUpdate(id, { token });
};

const updateSubscription = async (id, subscription) => {
  await User.findByIdAndUpdate(id, subscription, { new: true });
};

module.exports = {
  registerUser,
  loginUser,
  authenticateUser,
  logoutUser,
  updateSubscription,
};
