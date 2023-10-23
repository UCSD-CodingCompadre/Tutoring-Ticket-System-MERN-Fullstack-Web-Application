import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

/*
Custom React hook to handle if a user is logged in.
@param none
@return bool loggedIn true if the user is logged in
              bool loading true if the user is being fetched
*/
export const useAuthStatus = () =>
{

    // Hold the states being returned
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    // Hold the user
    const {user} = useSelector((state) => state.auth)

    // Change the states depending if the user is there or not
    useEffect(() =>
    {
        
        // Check if the user is logged in
        if(user)
        {
            setLoggedIn(true);
        }

        // Else the user is not logged in
        else
        {
            setLoggedIn(false);
        }

        // The custom react hook is done
        setLoading(false);
    }, [user])

    return {loggedIn, loading};
}