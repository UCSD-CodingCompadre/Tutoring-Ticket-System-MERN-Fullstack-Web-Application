import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {login, reset} from '../utilities/authSlice';
import {Spinner} from '../components/Spinner';

export const SignIn = () =>
{

    // Hold the useState for the form Data
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // Deconstruct the form data
    const {email, password} = formData;

    // Hold the dispatch hook
    const dispatch = useDispatch();

    // Hold the navigate hook
    const navigate = useNavigate();

    // Deconstruct the user
    const  {user, isLoading, isSuccess, isError,  message} = useSelector(state => state.auth);

    
    // On render check the status of the action
    useEffect(() =>
    {

        // Check if there is an error
        if(isError)
        {
            toast.error(message, {theme: "colored"});
        }

        // Check if the user is logged in
        if(isSuccess)
        {
            navigate('/')
        }

        dispatch(reset());
    }, [isError, isSuccess, user, dispatch, navigate, message])


    // Component functions

    /*
    Set form data 
    @param e event 
    @return none
    */
    const onChange = (e) =>
    {
        setFormData((prevState) =>
        (
            {
                ...prevState,
                [e.target.id]: e.target.value
            }
        ))
    }

    /*
    Submit form data and dispatch login 
    */
    const onSubmit = (e) =>
    {

        // Prevent page refresh
        e.preventDefault();
        
        // Hold the user data
        const userData = {
            email,
            password
        }

        // Dispatch login with the user data
        dispatch(login(userData));
    }

    // Check if the user is loading
    if(isLoading)
    {
        return (
            <Spinner />
        )
    }

    return (
        <>

            {/* Hold the page for the sign in route */}
            <div 
            className="page w-full bg-base-200 flex items-center content-center pb-24 pt-10"
            >    
                <div 
                className="hero-content flex-col mx-auto"
                >
                    <div 
                    className="text-center"
                    >
                        <h1 
                        className="text-5xl font-bold"
                        >
                            Log in!
                        </h1>
                        <p 
                        className="py-6"
                        >
                            Please enter your email and password to submit a ticket. 
                        </p>
                    </div>
                    
                    {/* Hold the DaisyUI component for a card */}
                    <div 
                    className="card flex-shrink-0 max-w-sm shadow-2xl bg-primary"
                    >
                        
                        {/* Hold the form that will handle sign in */}
                        <form
                        autoComplete="off"  
                        className="card-body min-w-fit max-w-sm"
                        onSubmit={onSubmit}
                        >

                           {/*  Hold a form element*/}
                            <div 
                            className="form-control"
                            >
                                <label 
                                className="label"
                                >
                                    <span 
                                    className="label-text text-primary-content"
                                    >
                                        Email
                                    </span>
                                </label>

                                {/* Hold the input for the user's email */}
                                <input 
                                className="input input-bordered bg-primary-focus text-primary-content placeholder:text-primary-content" 
                                id="email"
                                name="email"
                                onChange={onChange}
                                placeholder="Email"
                                required  
                                type="email"
                                value={email} 
                                />
                            </div>
                            <div 
                            className="form-control"
                            >
                                <label 
                                className="label"
                                >
                                    <span 
                                    className="label-text text-primary-content"
                                    >
                                        Password
                                    </span>
                                </label>
                                
                                {/* Hold the input for the user's password */}
                                <input 
                                className="input input-bordered bg-primary-focus text-primary-content placeholder:text-primary-content"  
                                id="password"
                                name="password"
                                onChange={onChange}
                                required 
                                type="password" 
                                value={password}
                                />
                            </div>
                            <div 
                            className="form-control mt-6"
                            >

                                {/* Hold the button to submit the form */}
                                <button 
                                className="btn bg-primary-focus border-0 text-primary-content hover:text-base-content"
                                type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}