import {Navigate, Outlet} from 'react-router-dom';
import {useAuthStatus} from '../hooks/useAuthStatus';
import {Spinner} from './Spinner';

export const PrivateRoute = () =>
{

    // Deconstruct the custom hook to determine if a user is logged in 
    const {loggedIn, loading} = useAuthStatus();

    // Check if the user is loading
    if(loading)
    {
        return (
            <>
                <Spinner />
            </>
        )
    }

    // Depending if the user exists render the protected route or sign in
    return loggedIn ? <Outlet /> : <Navigate to='/signin'/>
}