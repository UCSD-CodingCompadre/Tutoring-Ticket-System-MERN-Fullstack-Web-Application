const mongoose = require('mongoose');

/*
Schema: User 

Description: Implements a user of the tutoring ticket application. A user
will have email and password verification as well hold special properties
that distinguishes a tutor from a student

Fields:     name - name of the user
                email - email of the user
                password - password of the user
                isAdmin - determine if user is a tutor
                isBusy - determine if user is currently in a call with a tutor
*/
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        email: {
            type: String,
            required: [true, 'Please add a email'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please add a password']
        },
        isAdmin: {
            type: Boolean,
            required: [true, 'Please notify me if you are a tutor'],
            default: false
        },
        isProfessor: {
            type: Boolean,
            required: [true, 'Please notify me if you are a professor'],
            default: false
        },
        isBusy: {
            type: Boolean,
            require: [true],
            default: false 
        },
        hasSubmitted: {
            type: Boolean,
            require: [true],
            default: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema);