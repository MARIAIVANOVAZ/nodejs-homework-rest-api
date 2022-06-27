const { uploadImage } = require('../services/image.service');
const { updateUser } = require('../services/updateUser.service');

const updateAvatar = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    const avatarURL = await uploadImage(id, req.file);
    await updateUser(id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateAvatar,
};
