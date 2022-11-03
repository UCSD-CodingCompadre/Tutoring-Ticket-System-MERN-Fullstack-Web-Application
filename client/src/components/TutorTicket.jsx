import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {edit} from '../utilities/authSlice';
import {deleteTicket, editTicket} from '../utilities/ticketSlice';

export const TutorTicket = (props) =>
{

    // Deconstruct props
    const {id, description, product, status, tutor} = props;

    // Deconstruct the user state\
    const {user} = useSelector((state) => state.auth);

    // Hold the dispatch hook
    const dispatch = useDispatch();

    // Hold the navigate hook
    const navigate = useNavigate();

    // Component functions

    /*
    Accept the student's ticket and set the tutor status to be busy
    @param none
    @return none
    */
    const acceptTicket = () =>
    {

        // Hold the new data of the ticket
        let data = {
            id: id,
            editData: {
               status: 'open',
               tutor: user.name
            }
        }

        // Hold the new data of the user
        let userData = {
            ...user,
            isBusy: true
        }

        // Dispatch the action to edit the ticket
        dispatch(editTicket(data));

        // Dispatch the action to edit the user
        dispatch(edit(userData));

        // Navigate to the tutors zoom page
        navigate(`/tutor-tickets/${user.name}`)
    }

    /*
    Delete the student's ticket
    @param none
    @return none
    */
    const deleteTheTicket = () =>
    {

        // Hold the user data 
        let userData = {
            ...user,
            isBusy: false
        }

        // Dispatch the action to edit the user
        dispatch(edit(userData));

        // Delete the student's ticket
        dispatch(deleteTicket(id));
    }

    useEffect(() =>
    {

        // Check if the tutor is busy 
        if(user.isBusy)
        {

            // Navigate to the tutor's zoom page
            navigate(`/tutor-tickets/${user.name}`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>

            {/* Hold the Daisy UI card component for the tutors tickets */}
            <div 
            className="card w-80 bg-neutral text-neutral-content mt-8"
            >
                <div 
                className="card-body items-center text-center"
                >
                    <h2 
                    className="card-title"
                    >
                        {product}</h2>
                    <p>
                        {description}
                    </p>
                    <div 
                    className="card-actions justify-end"
                    >
                    
                        {/* Hold button to change status of ticket */}
                        {status === 'new'  &&
                        <>
                            <button 
                            className="btn btn-primary"
                            disabled={user.isBusy ? true : false}
                            onClick={acceptTicket}
                            >
                                Accept
                            </button>
                        </>
                        }
                    </div>

                    {/* Hold the Daisy UI alert component to check if the ticket has been accepted */}
                    <div 
                    className="alert shadow-lg text-left text-xs"
                    >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {status === 'new' &&
                                <p>
                                    Ticket has not been accepted.
                                </p>
                            }
                            {status === 'open' &&
                                <p>
                                    Ticket has been accepted by {tutor}.
                                </p>
                            }
                            {status === 'closed' &&
                                <p>
                                    Ticket has closed by {tutor}.
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}