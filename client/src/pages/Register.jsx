import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {register, reset} from '../utilities/authSlice';
import {Spinner} from '../components/Spinner';

export const Register = () =>
{

    // Hols the useState for the form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    // Deconstruct the form data
    const {name, email, password, password2} = formData;

    // Hold the dispatch hook
    const dispatch = useDispatch();
    
    // Hold the navigate hook
    const navigate = useNavigate();

    // Deconstruct the user 
    const {user, isLoading, isSuccess, isError,  message} = useSelector(state => state.auth)

    // On render check the status of the actions
    useEffect(() =>
    {

        // Check if there is an error 
        if(isError)
        {
            toast.error(message, {theme: "colored"});
        }

        // Check if the user is logged in
        if(isSuccess || user)
        {
            navigate('/')
        }

        dispatch(reset());
    }, [isError, isSuccess, user, dispatch, navigate, message])

    // Component functions

    /*
    Set the form data to match the inputs
    @param e event handler
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
    Submit the form data to register a user 
    @param e the submit event
    @return none
    */
    const onSubmit = (e) =>
    {

        // Prevent page refresh
        e.preventDefault();
        
        // Check if passwords match
        if(password !== password2)
        {

            // Render a toast for the error
            toast.error('Passwords do not match', {theme: "colored"})
        }

        // Else register the user by dispatching
        else
        {

            // Hold the user data
            const userData = {
                name,
                email,
                password
            }

            // Dispatch the register function
            dispatch(register(userData))
        }
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

            {/* Hold the page for the register route */}
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
                            Register now!
                        </h1>
                        <p 
                        className="py-6"
                        >
                            "Start early, start often" - Gary Gillepsie  
                        </p>
                    </div>
                    
                    {/* Hold the Daisy UI card component for the form */}
                    <div 
                    className="card flex-shrink-0 max-w-sm shadow-2xl bg-primary"
                    >
                        
                        {/* Hold the form to register a user */}
                        <form
                        autoComplete="off" 
                        className="card-body min-w-fit max-w-sm"
                        onSubmit={onSubmit}
                        >
                            
                            {/* Hold the container for a form element */}
                            <div 
                            className="form-control"
                            >
                                <label 
                                className="label"
                                >
                                    <span 
                                    className="label-text text-primary-content"
                                    >
                                        Student Name
                                    </span>
                                </label>
                               
                               {/* Hold the input for the name */}
                                <input 
                                className="input input-bordered bg-primary-focus text-primary-content placeholder:text-primary-content autofill:bg-primary-focus selection:bg-primary-focus" 
                                id="name"
                                name="name"
                                onChange={onChange}
                                placeholder="Name"
                                required 
                                type="text" 
                                value={name}
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
                                        Email
                                    </span>
                                </label>
                                
                                {/* Hold the input for the email */}
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
                                
                                {/* Hold the input for the password */}
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
                            className="form-control"
                            >
                                <label 
                                className="label"
                                >
                                    <span 
                                    className="label-text text-primary-content"
                                    >
                                        Confirm password
                                    </span>
                                </label>
                               
                               {/* Hold the input to confirm the password */}
                                <input 
                                className="input input-bordered bg-primary-focus text-primary-content placeholder:text-primary-content" 
                                id="password2"
                                name="password2"
                                onChange={onChange}
                                required 
                                type="password" 
                                value={password2}
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