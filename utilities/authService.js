import axios from 'axios';

// Hold the API URL
const API_URL = '/api/users/'

/*
Make the post request to the backend to register a user
@param userData data to register a user
@return object the user 
*/
const register = async (userData) =>
{
    
    // Hold the response from the post request
    const response = await axios.post(API_URL, userData)

    // Check if there is data from the response
    if(response.data)
    {

        // Hold the data in local storage
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}

/*
Make the post request to the backend to login a user
@param userData data to login a user
@return object the user 
*/
const signIn = async (userData) =>
{

    // Hold the response from the post request
    const response = await axios.post(API_URL + 'login', userData)

    // Check if there is data from the response
    if(response.data)
    {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}

/*
Remove the user from local storage
@param none
@return none
*/ 
const signOut = () =>
{
    localStorage.removeItem('user');
}

/*
Edit a user 
@param  ticketId the id of the ticket being searched
                token the JWT of the user
@return object the ticket
*/
const editUser = async(userData, token) =>
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
    const response = await axios.put(API_URL + 'submitted' , userData, config)
    
    return response.data;
}

/*
Get the tutor accounts 
@param none
@return array the tutors
*/
const getTutors = async() =>
{

    const response = await axios.get(API_URL + 'tutors')
    
    return response.data
}


const authService = {
    editUser,
    getTutors,
    register,
    signIn,
    signOut
}

export default authService;