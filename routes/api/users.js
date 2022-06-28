const express = require('express');

const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  confirmUser,
  resend,
} = require('../../controllers/users');
const { updateAvatar } = require('../../controllers/avatar');
const { auth } = require('../../middlewares/authenticate');
const { upload } = require('../../middlewares/upload');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', auth, logoutUser);
router.get('/current', auth, currentUser);
router.patch('/avatars', auth, upload.single('avatar'), updateAvatar);
router.get('/verify/:verificationToken', confirmUser);
router.post('/verify', resend);
module.exports = router;
