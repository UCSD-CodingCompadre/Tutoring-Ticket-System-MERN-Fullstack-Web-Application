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

const authService = {
    register,
    signIn,
    signOut
}

export default authService;