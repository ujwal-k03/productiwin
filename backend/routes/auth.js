const {Router} = require('express');
const { signupUser, loginUser, logoutUser, checkStatus } = require('../controllers/authController');

const router = Router();

// create a new user
router.post('/signup', signupUser);

// authenticate a new user
router.post('/login', loginUser);

// logout a user
router.get('/logout', logoutUser);

module.exports = router;