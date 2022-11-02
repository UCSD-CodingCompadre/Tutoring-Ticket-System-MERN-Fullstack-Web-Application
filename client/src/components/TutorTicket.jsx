import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {edit} from '../utilities/authSlice';
import {editTicket} from '../utilities/ticketSlice';

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

    const acceptTicket = () =>
    {
        let data = {
            id: id,
            editData: {
               status: 'open',
               tutor: user.name
            }
        }

        let userData = {
            ...user,
            isBusy: true
        }

        dispatch(editTicket(data));
        dispatch(edit(userData));
        navigate(`/tutor-tickets/${user.name}`)
    }

    const deleteTicket = () =>
    {

        let data = {
            id: id,
            editData: {
               status: 'new',
               tutor: null
            }
        }

        let userData = {
            ...user,
            isBusy: false
        }
        dispatch(edit(userData));
        dispatch(editTicket(data));
    }

    useEffect(() =>
    {
        if(user.isBusy)
        {
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
                        {status === 'new' ?
                        <>
                            <button 
                            className="btn btn-primary"
                            disabled={user.isBusy ? true : false}
                            onClick={acceptTicket}
                            >
                                Accept
                            </button>
                        </>
                        :
                        <>
                            <button 
                            className="btn btn-error"
                            onClick={deleteTicket}
                            >
                                Delete
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
                            <p>{status === 'new' ? 'Ticket has not been accepted' : `Ticket has been accepted by ${tutor}`} </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}