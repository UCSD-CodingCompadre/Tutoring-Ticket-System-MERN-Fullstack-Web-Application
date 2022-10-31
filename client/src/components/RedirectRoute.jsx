import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';

export const RedirectRoute = () =>
{
    
    // Deconstruct the custom hook to determine if a user is logged in 
    const {hasSubmitted} = useSelector((state) => state.auth);

    console.log(hasSubmitted);

    // Depending if the user exists render the protected route or sign in
    return hasSubmitted ?  <Navigate to='/my-tickets'/> : <Outlet />
}