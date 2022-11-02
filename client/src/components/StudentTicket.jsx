import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {clearSubmission, edit} from '../utilities/authSlice';
import {deleteTicket} from '../utilities/ticketSlice';

export const StudentTicket = (props) =>
{

    // Deconstruct props
    const {id, description, product, status, tutor} = props;

    // Hold the user logged in 
    const {user} = useSelector((state) => state.auth);

    // Hold the dispatch hook
    const dispatch = useDispatch();

    // Hold the navigate hook
    const navigate = useNavigate();

    // Component functions

    const deleteStudentTicket = (ticketId) =>
    {
        dispatch(clearSubmission());
        // Dispatch the submission user action
        dispatch(edit({
            ...user,
            hasSubmitted: false
        }))
        dispatch(deleteTicket(ticketId));
        navigate('/')
    }
    
    const editStudentTicket = (ticketId) =>
    {
        navigate(`/my-tickets/${ticketId}`)
    }

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
                        {product}
                    </h2>
                    <p>
                        {description}
                    </p>
                    <div 
                    className="card-actions justify-end"
                    >
                        
                        {/* Hold the route to edit the student's ticket */}
                        <button 
                        className="btn btn-primary" 
                        onClick={() => editStudentTicket(id)}
                        >
                            Edit
                        </button>
                        
                        {/* Hold the button to delete this ticket from MongoDB */}
                        <button 
                        className="btn btn-primary"
                        onClick={() => deleteStudentTicket(id)}
                        >
                            Delete
                        </button>
                    </div>
                    
                    {/* Hold the Daisy UI alert component to show the status of the ticket */}
                    <div 
                    className="alert shadow-lg text-left text-xs"
                    >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <p>{status === 'new' ? 'Ticket has not been accepted' : 'Ticket has been accepted click zoom link below'} </p>
                        </div>
                    </div>

                    {/* Render the tutor and zoom link if the ticket is open */}
                    {status === 'open' && 
                    <>
                        <p>
                            You've been assigned: {tutor}  
                        </p>
                        <a 
                        className="link"
                        href="."
                        >
                            Click here to open Zoom call
                        </a>
                    </>
                    }
                </div>
            </div>
        </>
    )
}