const {Router} = require('express');
const { signupUser, loginUser, logoutUser, checkStatus, getDetails } = require('../controllers/authController');

const router = Router();

// create a new user
router.post('/signup', signupUser);

// authenticate a new user
router.post('/login', loginUser);

// logout a user
router.get('/logout', logoutUser);

// get details
router.get('/details', getDetails);

module.exports = router;