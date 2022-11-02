const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

/*
@desc Get a users tickets
@route /api/tickets
@access Private
*/
const getTickets = asyncHandler(async (req, res) =>
{

    // Hold the user
    const user = await User.findById(req.user._id);

    // Check if the user exists
    if(!user)
    {
        res.status(401);
        throw new Error('User not found');
    }

    // Retrieve tickets from MongoDB
    const tickets = await Ticket.find({user: req.user._id});

    res.status(200).json(tickets);
})

/*
@desc Get a all the tickets for the tutor
@route /api/tickets/tutor-view
@access Private
*/
const getAllTickets = asyncHandler(async(req, res) =>
{

    // Check if user is a tutor
    try
    {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    }
    catch(error)
    {
        res.status(401);
        throw new Error('Not a tutor.')
    }
})

/*
@desc Get a single ticket 
@route /api/tickets/:id
@access Private
*/
const getSingleTicket = asyncHandler(async(req, res) =>
{

    // Hold the user
    const user = await User.findById(req.user._id);

    // Check if there is a user
    if(!user)
    {
        res.status(401);
        throw new Error('User not found');
    }

    // Hold and find a ticket
    const ticket = await Ticket.findById(req.params._id);

    // Check if there is a ticket
    if(!ticket)
    {
        res.status(404);
        throw new Error('Ticket not found');
    }

    // Check if the user is allowed to access that ticket
    if(ticket.user.toString() !== req.user.id && !user.isAdmin)
    {
        res.status(401);
        throw new Error('Not authorized');
    }

    res.status(200).json(ticket);
})

/*
@desc Create a single ticket
@route /api/tickets/
@access Private
*/
const createTicket = asyncHandler(async (req, res) =>
{

    // Hold the data for the ticket
    const {product, description} = req.body;

    // Check if there is data for the ticket
    if(!product || !description)
    {
        res.status(400);
        throw new Error('Please add a product and description');
    }

    // Hold the user
    const user = await User.findById(req.user._id);

    // Check if there is a user
    if(!user)
    {
        res.status(401);
        throw new Error('User not found');
    }

    // Create a ticket model using the Ticket schema
    const ticket = await Ticket.create(
        {
            product,
            description,
            user: req.user.id,
            status: 'new',
            tutor: null
        }
    )

    res.status(200).json(ticket)
})

/*
@desc Delete a single ticket
@route /api/tickets/:id
@access Private
*/
const deleteSingleTicket = asyncHandler(async(req, res) =>
{

    // Hold the user
    const user = await User.findById(req.user.id);

    // Check if there is a user
    if(!user)
    {
        res.status(401);
        throw new Error('User not found');
    }

    // Hold the ticket
    const ticket = await Ticket.findById(req.params.id);

    // Check if there is a ticket
    if(!ticket)
    {
        res.status(404);
        throw new Error('Ticket not found');
    }

    // Check if the user is allowed to access that ticket
    if(ticket.user.toString() !== req.user.id && !user.isAdmin)
    {
        res.status(401);
        throw new Error('Not authorized');
    }

    // Remove the ticket from MongoDB
    await ticket.remove();
    
    res.status(200).json({success: true});
})

/*
@desc Update a single ticket
@route /api/tickets/:id
@access Private
*/
const updateSingleTicket = asyncHandler(async(req, res) =>
{

    // Hold a user
    const user = await User.findById(req.user.id);

    // Check if there is a user
    if(!user)
    {
        res.status(401);
        throw new Error('User not found');
    }

    // Hold the ticket
    const ticket = await Ticket.findById(req.params.id);

    // Check if there is a ticket
    if(!ticket)
    {
        res.status(404);
        throw new Error('Ticket not found');
    }

    // Check if the user is allowed to access that ticket
    if(ticket.user.toString() !== req.user.id && !user.isAdmin)
    {
        res.status(401);
        throw new Error('Not authorized');
    }

    // Update the ticket on MongoDB
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})
    
    res.status(200).json(updatedTicket);
})

module.exports = 
{
    createTicket,
    deleteSingleTicket,
    getAllTickets,
    getSingleTicket,
    getTickets,
    updateSingleTicket
}

