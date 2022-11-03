const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/*
@desc Register a new user
@route /api/users
@access Public
*/
const registerUser =  asyncHandler(async(req, res) =>
{

    // Deconstruct fields for the user
    const {name, email, password} = req.body
    
    // Check if all the fields are included
    if(!name || !email || !password)
    {
        res.status(400);
        throw new Error('Please include all fields');
    }

    // Find user
    const userExists = await User.findOne({email: email})

    // Check if user exists
    if(userExists)
    {
        res.status(400)
        throw new Error('User already exists')
    }

    // Import genSalt for hashing
    const salt = await bcrypt.genSalt(10);

    // Hold the hashed password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a user model using the User schema
    const user = await User.create(
        {
            name: name,
            email: email,
            password: hashedPassword,
            isAdmin: false,
            isBusy: false,
            isProfessor: false,
            hasSubmitted: false
        }
    )

    // Check if a user was created
    if(user)
    {
        
        // Post request the user 
        res.status(201).json(
            {
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: false,
                isBusy: false,
                isProfessor: false,
                hasSubmitted: false,
                token: generateToken(user._id)
            }
        )
    }

    // Else throw an Error to the error middleware
    else
    {
        res.status(400);
        throw new error('Invalid user data');
    }

    res.send('Register user page')
})

/*
@desc Login a new user
@route /api/users/login
@access Public
*/
const loginUser = asyncHandler(async(req, res) =>
{

    // Deconstruct email and password
    const {email, password} = req.body;

    // Find a user with the email
    const user = await User.findOne({email})

    // Check if the password is correct
    if(user && (await bcrypt.compare(password, user.password)))
    {

        // Post request the user logged in
        res.status(200).json(
            {
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isBusy: user.isBusy,
                isProfessor: user.isProfessor,
                hasSubmitted: user.hasSubmitted,
                token: generateToken(user._id)
            }
        )
    }

    // Else throw an Error to the error middleware
    else 
    {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

/*
@desc Get current user
@route /api/users/me
@access Private
*/
const getMe = asyncHandler(async(req, res) =>
{

    // Get the user data
    const user = {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
    }

    res.json(user);
})

/*
@desc Edit a user
@route /api/users/submitted
@access Private
*/
const setUser = asyncHandler(async(req, res) =>
{

    // Hold the user email
    const {email} = req.body

    // Hold a user
    const user = await User.findOne({email});

    // Check if there is a user
    if(!user)
    {
        res.status(401);
        throw new Error('User not found');
    }

    // Update the user on MongoDB
    const updatedUser = await User.findByIdAndUpdate(user.id, req.body, {new: true})

    // Put the user on the express route
    res.status(200).json(updatedUser)
})

/*
@desc Get the tutors
@route /api/users/tutors
@access Public
*/
const getTutors = asyncHandler(async(req, res) =>
{

    // Hold the tutors from MongoDB by filtering the model
    let tutors = await User.find({isAdmin: true, isProfessor: false}).exec();
    
    // Check if there is no tutors
    if(!tutors)
    {
        res.status(401);
        throw new Error('Tutors not found')
    }

    // Else send the response to express
    else
    {
        res.status(200).json(tutors);
    }
})

/*
Generate a JSON Web Token
@param id the users id
@return string a JWT to allow user authentication of routes and data 
*/
const generateToken = (id) =>
{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = 
{
    getMe,
    getTutors,
    loginUser,
    registerUser,
    setUser
}