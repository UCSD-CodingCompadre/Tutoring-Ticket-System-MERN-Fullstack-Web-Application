import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {GoSignIn, GoSignOut, GoPerson} from 'react-icons/go';
import {logout, reset} from '../utilities/authSlice';
import {clearTickets} from '../utilities/ticketSlice';

export const Navbar = () =>
{

    // Hold dispatch hook
    const dispatch = useDispatch();

    // Hold navigate hook
    const navigate = useNavigate();

    // Deconstruct user from redux store
    const  {user} = useSelector(state => state.auth)

    // Component functions

    /*
    Dispatch the logout function to log out the user and
    redirect them back to the Home page
    @param none
    @return none
    */
    const signOut = () =>
    {
        dispatch(logout());
        dispatch(reset());
        dispatch(clearTickets());
        navigate('/');
    }

    return (
        <>
            {/* Hold the Daisy UI navbar component */}
            <div 
            className="navbar bg-primary shadow-lg"
            >
                
                {/* Hold container to set width */}
                <div 
                className="container mx-auto flex items-center justify-between text-primary-content"
                >
                    
                    {/* Hold the route to go home */}
                    <Link 
                    className="btn btn-ghost normal-case text-xl"
                    to="/"
                    >
                        CSE/ECE Tutoring Center
                    </Link>
                    
                    {/* Check if the user is logged in */}
                    {user ? 
                       
                        // Render sign out button    
                        <button
                        className="w-fit"
                        onClick={signOut}
                        >
                            Sign out <GoSignOut className='inline-block'/>
                        </button>
                        :
                        <>
                            {/* Render the Daisy UI dropdown menu */}
                            <div 
                            className="dropdown dropdown-end"
                            >
                                <svg 
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" 
                                viewBox="0 0 24 24" 
                                className="inline-block w-5 h-5 stroke-current"
                                tabIndex={0}
                                >
                                    <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M4 6h16M4 12h16M4 18h16"
                                    >
                                    </path>
                                </svg>
                                <ul 
                                className="menu dropdown-content  p-2 shadow bg-primary-focus rounded-box w-28 mt-6"
                                tabIndex={0} 
                                >

                                    {/* Hold the route to sign in */}
                                    <Link
                                    className="w-fit"
                                    to="/signin"
                                    >
                                        Sign in <GoSignIn className='inline-block'/>
                                    </Link>

                                    {/* Hold the route to sign up */}
                                    <Link
                                    className='w-fit mt-2'
                                    to="/register"
                                    >
                                        Register <GoPerson className='inline-block'/>
                                    </Link>
                                </ul>
                             </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}