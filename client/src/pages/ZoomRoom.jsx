import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {edit, reset, logout} from '../utilities/authSlice';
import {deleteTicket} from '../utilities/ticketSlice';
 
export const ZoomRoom = () =>
{

    const {tickets} = useSelector((state) => state.ticket)

    const {user} = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const params =  useParams();

    const dispatch = useDispatch();

    const tutor = params.tutor;

    const handleEndCall = () =>
    {
        for(let i = 0; i < tickets.length; i++)
        {
            if(tickets[i].tutor === tutor)
            {
                dispatch(deleteTicket(tickets[i]._id))
                let userData = {
                    ...user,
                    isBusy: false
                }
                dispatch(edit(userData));
                dispatch(reset());
                dispatch(logout());
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