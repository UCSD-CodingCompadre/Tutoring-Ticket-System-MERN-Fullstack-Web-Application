import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {edit} from '../utilities/authSlice';
import {editTicket} from '../utilities/ticketSlice';
 
export const ZoomRoom = () =>
{

    // Hold the tickets from state
    const {tickets} = useSelector((state) => state.ticket)

    // Hold the user from state
    const {user} = useSelector((state) => state.auth);

    // Hold the navigate hook
    const navigate = useNavigate();

    // Hold the params hook
    const params =  useParams();

    // Hold the dispatch hook
    const dispatch = useDispatch();

    // Hold the tutor name
    const tutor = params.tutor;

    // Component functions
    
    /*
    End the zoom call and delete the student's ticket
    */
    const handleEndCall = () =>
    {

        // Find the ticket that is active
        for(let i = 0; i < tickets.length; i++)
        {

            // Check by seeing if the tutor is the same
            if(tickets[i].tutor === tutor)
            {

                // Hold the new user data
                let userData = {
                    ...user,
                    isBusy: false
                }

                // Dispatch the action to edit the user
                dispatch(edit(userData));

                //  Hold the new data of the ticket
                let data = {
                    id: tickets[i]._id,
                    editData: {
                    ...tickets[i],
                    status: 'closed'
                    }
                }

                // Dispatch the action to edit the ticket
                dispatch(editTicket(data));

                // Navigate back home
                navigate('/')
            }
        }
    }

    return (
        <>
            <div 
            className="page flex items-center justify-center px-12"
            >
                    <div className="alert alert-success shadow-lg flex flex-col w-fit">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>You have accepted a ticket. The student is waiting for you.</span>
                        </div>
                        <div>
                            <a className="link link-neutral" href='http://zoom.com'>Click to enter call</a>
                        </div>
                        <button 
                        className="btn"
                        onClick={handleEndCall}
                        >
                            End Call
                        </button>
                    </div>
            </div>
        </>
    )   
}