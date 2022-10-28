const mongoose = require('mongoose');

/*
Connect MongoDB to Node.js
@param none
@return none
*/
const connectDB = async () =>
{

    // Check if a connection can be made using mongoose
    try
    {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    }

    // Else throw an Error
    catch (error)
    {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}

module.exports = connectDB;