const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

/*
Middleware that protects routes in the backend from unauthorized users 
@param req the request from the backend
               res the response from the backend
               next function to allow access to route
@return none
*/
const protect = asyncHandler(async (req, res, next) => 
{

    // Hold the JWT
    let token;

    // Check if the correct request is being made
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {

        // Check if a user exists with the token
        try
        {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if(!req.user)
            {
                    res.status(401)
                    throw new Error('Not authorized')
            }
            next();
        }
        
        // Else throw an Error 
        catch(err)
        {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    // Check if there is no token
    if(!token)
    {
        res.status(401)
        throw new Error('Not authorized')
    }
})

module.exports = {protect}