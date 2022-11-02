import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from  'react-router-dom';
import {toast} from 'react-toastify';
import {Spinner} from '../components/Spinner';
import {edit} from '../utilities/authSlice';
import {createTicket, reset} from '../utilities/ticketSlice';

export const TicketForm = () =>
{

    // Hold the user logged in
    const {user} = useSelector((state) => state.auth);

    // Deconstruct the ticket state
    const {isLoading, isError, message} = useSelector((state) => state.ticket);

    // Hold the dispatch hook
    const dispatch = useDispatch();

    // Hold the navigate hook
    const navigate = useNavigate();

    // Deconstruct the user 
    const {name, email} = user;

    // Hold the useState for the course
    const [product, setProduct] = useState('ECE 35');

    // Hold the useState for the description
    const [description, setDescription] = useState('');

    // On render check the status of the actions
    useEffect(() => 
    {

        // Check if there is an error
        if(isError)
        {
            toast.error(message, {theme: "colored"});
        }

        // Check if the ticket has been submitted to go view it
        if(user.hasSubmitted)
        {
            dispatch(reset());
            navigate('/my-tickets')
        }

        dispatch(reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.hasSubmitted, isError])

    // Component functions

    /*
    Create a ticket using the dispatch hook
    @param e the event
    @return none
    */
    const onSubmit = (e) =>
    {

        // Prevent page refresh
        e.preventDefault();
        
        // Dispatch the create ticket action
        dispatch(createTicket({product, description}))

        // Dispatch the submission user action
        dispatch(edit({
            ...user,
            hasSubmitted: true
        }))
    }

    // Check if the ticket form is loading
    if(isLoading)
    {
        return (
            <Spinner />
        )
    }
    
    return (
        <>

            {/* Hold the page for the ticket form */}
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
                            Create New Ticket
                        </h1>
                        <p 
                        className="py-6"
                        >
                            Please select your course and describe your problem/bug.
                        </p>
                    </div>
                    
                    {/* Hold the Daisy UI card component that will contain the form */}
                    <div 
                    className="card flex-shrink-0 max-w-sm shadow-2xl bg-primary"
                    >
                    
                        {/* Hold the form*/}
                        <form
                        autoComplete="off"  
                        className="card-body min-w-fit max-w-sm"
                        onSubmit={onSubmit}
                        >

                            {/* Hold the form element */}
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
                                className="input input-bordered bg-primary-focus disabled:text-primary" 
                                disabled
                                id="name"
                                name="name"
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
                                className="input input-bordered bg-primary-focus disabled:text-primary" 
                                disabled
                                id="email"
                                name="email"
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
                                        Select your course
                                    </span>
                                </label>
                                
                                {/* Hold the select element to choose the course */}
                                <select 
                                className="select select-bordered w-full max-w-xs bg-primary-focus text-primary-content"
                                onChange={(e) => setProduct(e.target.value)}
                                value={product}
                                >

                                    {/* Hold all the course options */}
                                    <option selected>ECE 35</option>
                                    <option>ECE 45</option>
                                    <option>ECE 65</option>
                                    <option>ECE 101</option>
                                    <option>CSE 8A</option>
                                    <option>CSE 8B</option>
                                    <option>CSE 11</option>
                                    <option>CSE 12</option>
                                    <option>CSE 15L</option>
                                    <option>CSE 30</option>
                                    <option>CSE 100</option>
                                </select>
                            </div>
                            <div 
                            className="form-control"
                            >
                                <label 
                                className="label"
                                >
                                    <span 
                                    className="label-text text-primary-content "
                                    >
                                        Description
                                    </span>
                                </label>

                                {/* Hold the textarea for the ticket description */}
                                <textarea 
                                className="textarea textarea-bordered bg-primary-focus text-primary-content placeholder:text-primary-content resize-none min-h-full h-20" 
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add description"
                                value={description}
                                >
                                </textarea>
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