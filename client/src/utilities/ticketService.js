import axios from 'axios';

// Hold the url for API in the backend
const API_URL = '/api/tickets/';

/*
Make a post request to create a ticket
@param ticketData data for the ticket
               token the JWT of the user creating the ticket
@return object the ticket
*/
const createTicket = async(ticketData, token) =>
{

    // Hold the configuration for the post request
    const config =
    {
        headers: 
        {
            Authorization: `Bearer ${token}`
        }
    }

    // Hold the response of the post request
    const response = await axios.post(API_URL, ticketData, config)

    return response.data;
}

/*
Get all the users tickets
@param token the JWT of the user
@return array the user's tickets
*/
const getMyTickets = async(token) =>
{

    // Hold the configuration for the get request
    const config =
    {
        headers: 
        {
            Authorization: `Bearer ${token}`
        }
    }

    // Hold the response of the get request
    const response = await axios.get(API_URL, config)
    
    return response.data;
}

/*
Get a specific user ticket
@param  ticketId the id of the ticket being searched
                token the JWT of the user
@return object the ticket
*/
const getATicket = async(ticketId, token) =>
{

    // Hold the configuration for the get request
    const config =
    {
        headers: 
        {
            Authorization: `Bearer ${token}`
        }
    }

    // Hold the response of the get request
    const response = await axios.get(API_URL + '/' + ticketId, config)
    
    return response.data;
}

/*
Remove a specific ticket
@param  ticketId the id of the ticket being removed
                token the JWT of the user
@return object the ticket removed
*/
const closeTicket = async(ticketId, token) =>
{

    // Hold the configuration for the delete request
    const config =
    {
        headers: 
        {
            Authorization: `Bearer ${token}`
        }
    }

    // Hold the response of the delete request
    const response = await axios.delete(API_URL + '/' + ticketId, config)
    
    return response.data;
}

/*
Get all the tickets in the database
@param  token the JWT of the user
@return array all the tickets
*/
const getAllTickets = async(token) =>
{

     // Hold the configuration for the get request
    const config =
    {
        headers: 
        {
            Authorization: `Bearer ${token}`
        }
    }

    // Hold the response of the get request
    const response = await axios.get(API_URL + '/tutor-view', config)
    
    return response.data;
}

const ticketService =
{
    closeTicket,
    createTicket,
    getATicket,
    getAllTickets,
    getMyTickets
}

export default ticketService;