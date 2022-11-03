const express = require('express');
const router = express.Router();
const {getMe, getTutors, loginUser, registerUser, setUser} = require('../controllers/userController');

// Hold authentication middleware so only users with the correct header can access the routes
const {protect}= require('../middleware/authMiddleware');

// Set a POST request to register a user
router.post('/', registerUser);

// Set a POST request to login a user
router.post('/login', loginUser);

// Set a GET request to retrieve user data
router.get('/me', protect, getMe);

// Set a GET request to get tutors
router.get('/tutors', getTutors);

// Set a PUT request to set the user submission
router.put('/submitted', setUser);

// Export the router for the user API
module.exports = router;