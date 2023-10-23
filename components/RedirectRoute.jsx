import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';


export const RedirectRoute = () =>
{
    
    // Deconstruct the custom hook to determine if a user is logged in 
    const {user} = useSelector((state) => state.auth);

    // Depending if the user exists render the protected route or sign in
    return user.hasSubmitted || !user ?  <Navigate to='/my-tickets'/> : <Outlet />
}