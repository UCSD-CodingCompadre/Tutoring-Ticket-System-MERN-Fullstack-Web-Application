const express = require('express');
const router = express.Router();
const {getTutors, loginUser, registerUser, setUser} = require('../controllers/userController');

// Set a POST request to register a user
router.post('/', registerUser);

// Set a POST request to login a user
router.post('/login', loginUser);

// Set a GET request to get tutors
router.get('/tutors', getTutors);

// Set a PUT request to set the user submission
router.put('/submitted', setUser);

// Export the router for the user API
module.exports = router;