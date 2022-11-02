import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom';
import {editTicket} from '../utilities/ticketSlice';
import {Spinner} from '../components/Spinner';
import {toast} from 'react-toastify';

export const EditTicket = () =>
{

    // Hold the user logged in
    const {user} = useSelector((state) => state.auth);

    // Hold the ticket state
    const {tickets, isLoading, isError, message} = useSelector((state) => state.ticket);

    // Deconstruct the user 
    const {name, email} = user;

    // Hold the useState for the description
    const [description, setDescription] = useState('');
    
    // Hold the params hook
    const params = useParams();

    // Hold the dispatch hook
    const dispatch = useDispatch();

    // Hold the navigate hook
    const navigate = useNavigate();
    
    useEffect(() =>
    {
        if(isError)
        {
            toast.error(message, {theme: "colored"});
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isError])

     /*
    Edit a ticket using the dispatch hook
    @param e the event
    @return none
    */
    const onSubmit = (e) =>
    {

        // Prevent page refresh
        e.preventDefault();

        // Hold the course name
        let course = tickets[0].product;

        // Hold the new data of the ticket
        let data = {
            id: params.id,
            editData: {
                product: course,
                description: description
            }
        }
       
        // Dispatch the edit ticket action
        dispatch(editTicket(data));

        // Navigate to the user's tickets 
        navigate('/my-tickets');
    }
    
    if(isLoading)
    {
        return (
            <Spinner />
        )
    }

    return (
        <>
            <div 
            className="page px-4 w-screen flex items-center justify-center"
            >
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
                                value={tickets[0].product}
                                >
                                    <option 
                                    value={tickets[0].product}
                                    >
                                        {tickets[0].product}
                                    </option>
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
        </>
    )
}