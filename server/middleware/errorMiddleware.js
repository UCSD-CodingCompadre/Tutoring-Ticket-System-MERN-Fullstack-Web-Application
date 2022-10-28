/*
Middleware to handle any Errors thrown from the backend
@param err the err
               req the request from the backend
               res the response from the backend
               next the function to continue the backend after an error has been thrown
@return none
*/
const errorHandler = (err, req, res, next) =>
{
    const statusCode = res.statusCode < 400 ? 500 : res.statusCode

    res.status(statusCode);
    res.json({
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack 
    })
}

module.exports = {errorHandler}