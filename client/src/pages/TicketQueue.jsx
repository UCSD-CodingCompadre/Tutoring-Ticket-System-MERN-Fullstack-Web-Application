import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTheTutors} from '../utilities/authSlice';
import {clearTickets, getAllTickets, reset} from '../utilities/ticketSlice';
import {TutorCard} from '../components/TutorCard';
import {QueueTicket} from "../components/QueueTicket"
import {Spinner} from '../components/Spinner';

export const TicketQueue = () =>
{

    const {tutors} = useSelector((state) => state.auth);

    const {tickets, isLoading, isSuccess} = useSelector((state) => state.ticket);

    const dispatch = useDispatch();

    useEffect(() => {
      
        dispatch(getAllTickets());
        dispatch(getTheTutors());
    
        return () => 
        {
            if(isSuccess)
            {
                dispatch(clearTickets());
                dispatch(reset());   
            }
 
        }

    }, [dispatch, isSuccess])
    
    console.log(tutors)

    // Check if the tickets are loading
    if(isLoading)
    {
        return (
            <Spinner />
        )
    }

    return (
        <>
            <div 
            className="page w-screen flex flex-col items-center justify-center"
            >   
                <div 
                className="card w-80 bg-neutral text-neutral-content"
                >
                    <div 
                    className="card-body items-center text-center"
                    >
                        <h2 
                        className="card-title"
                        >
                            Tutors on Duty
                        </h2>
                        {tutors.map((tutor) =>
                        {
                            return (
                                <TutorCard 
                                name={tutor.name}
                                status={tutor.isBusy}
                                />
                            )
                        })}
                    </div>
                </div>
                {tickets.map((ticket) =>
                {
                    return (
                        <QueueTicket 
                        description={ticket.description}
                        product={ticket.product}
                        status={ticket.status}
                        tutor={ticket.tutor}
                        />
                    )
                })}
            </div>
        </>
    )
}