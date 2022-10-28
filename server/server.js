const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/database');
const PORT = process.env.PORT || 5000;

// Call async function to connect Node.js with MongoDB
connectDB();

// Hold the Express.js application
const app = express();

// Hold body parser middleware to send raw JSON
app.use(express.json())

// Hold middleware to accept url encoded form
app.use(express.urlencoded({extended: false}))

// Set default route
app.get('/', (req, res) => 
{
    res.status(200).json({message: 'Welcome to my Tutoring Ticket System'})
})

// Use the routes for the user API
app.use('/api/users', require('./routes/userRoutes'));

// Use the routes for the ticket API
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Hold the middle for error handling
app.use(errorHandler);

// Run Express.js server on port 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));