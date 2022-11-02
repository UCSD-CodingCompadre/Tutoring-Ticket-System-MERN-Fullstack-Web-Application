const mongoose = require('mongoose');

/*
Schema: Ticket

Description: Implements a ticket for tutoring ticket application. A ticket will hold
the course and description for visiting the tutoring center. A tutor can be assigned to the ticket and
update its status.

Fields:     user - id of the user who created the ticket
                product - the course the student needs help in
                description - the details of the students problem
                status - determine if the students is waiting or being helped
                tutor - the tutor responsible for the status of the ticket
*/
const ticketSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        product: {
            type: String,
            required: [true, 'Please select your course'],
            enum: ['ECE 35', 'ECE 45', 'ECE 65', 'ECE 101', 'CSE 11', 'CSE 8A', 'CSE 8B', 'CSE 12', 'CSE 15L', 'CSE 30', 'CSE 100']
        },
        description: {
            type: String,
            required: [true, 'Please enter a description of your problem/bug']
        },
        status: {
            type: String,
            required: [true, 'Please notify me if you are a tutor'],
            enum: ['new', 'open', 'closed'],
            default: 'new'
        },
        tutor:
        {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Ticket', ticketSchema);