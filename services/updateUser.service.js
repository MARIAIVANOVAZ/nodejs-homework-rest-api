const { User } = require('../models/users');

const updateUser = async (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};
module.exports = {
  updateUser,
};
