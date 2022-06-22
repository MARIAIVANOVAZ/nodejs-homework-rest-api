const Jimp = require('jimp');
const path = require('path');
const fs = require('fs').promises;

const uploadImage = async (id, file) => {
  const avatarURL = path.join(
    'avatars',
    `${id}${path.extname(file.originalname)}`
  );

  try {
    const image = await Jimp.read(file.path);
    await image
      .resize(250, 250)
      .write(path.join(__dirname, '../public', avatarURL));

    return avatarURL;
  } catch (error) {
    throw error;
  } finally {
    await fs.unlink(file.path);
  }
};

module.exports = { uploadImage };
