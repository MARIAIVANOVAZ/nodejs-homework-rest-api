const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
} = require('../../controllers/users');
const { auth } = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', auth, logoutUser);
router.get('/current', auth, currentUser);

module.exports = router;
