const multer = require('multer');
const path = require('path');
const TEMP_DIR = path.join(__dirname, '../temp');
const { createError } = require('../errors/errors');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function fileFilter(req, file, cb) {
    if (file.mimetype.includes('image')) {
      cb(null, true);
    } else {
      cb(createError(400, 'Wrong format'));
    }
  },
  limits: {
    fieldNameSize: 100,
    fileSize: 5000000,
  },
});

module.exports = { upload };
