const express = require('express');
const router = express.Router();
const {createTicket, deleteSingleTicket, getAllTickets, getSingleTicket, getTickets, updateSingleTicket} = require('../controllers/ticketController');

// Hold authentication middleware so only users with the correct header can access the routes
const {protect} = require('../middleware/authMiddleware');

// Set a GET request to retrieve user tickets
// Set a POST request to add a ticket for the user
router.route('/').get(protect, getTickets).post(protect, createTicket);

// Set a GET request for the tutor to retrieve all tickets
router.route('/tutor-view').get(getAllTickets);

// Set a GET request to retrieve a ticket
// Set a DELETE request to delete a ticket
// Set a PUT request to update the ticket
router.route('/:id').get(protect, getSingleTicket).delete(protect, deleteSingleTicket).put(protect, updateSingleTicket);

module.exports = router;