import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTheTutors} from '../utilities/authSlice';
import {clearTickets, getAllTickets, reset} from '../utilities/ticketSlice';
import {TutorCard} from '../components/TutorCard';
import {QueueTicket} from "../components/QueueTicket"
import {Spinner} from '../components/Spinner';

export const TicketQueue = () =>
{

    // Hold the tutors from state
    const {tutors} = useSelector((state) => state.auth);

    // Deconstruct the ticket state
    const {tickets, isLoading, isSuccess} = useSelector((state) => state.ticket);

    // Hold the dispatch hook
    const dispatch = useDispatch();

    // On render fetch the tickets and tutors
    useEffect(() => {
      
        // Dispatch the action to get all tickets
        dispatch(getAllTickets());

        // Dispatch the action to get all tutors
        dispatch(getTheTutors());
    
        // On unmount clear the tickets and reset the ticket state
        return () => 
        {
            if(isSuccess)
            {
                dispatch(clearTickets());
                dispatch(reset());   
            }
        }

    }, [dispatch, isSuccess])
    
    
    // Check if the tickets are loading
    if(isLoading)
    {
        return (
            <Spinner />
        )
    }

    return (
        <>
        
            {/* Hold the page to display the ticket order and tutors on duty */}
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

                        {/* Render all the tutors */}
                        {tutors.map((tutor) =>
                        {

                            // Render the TutorCard component for each tutor
                            return (
                                <TutorCard 
                                name={tutor.name}
                                status={tutor.isBusy}
                                />
                            )
                        })}
                    </div>
                </div>

                {/* Render all the tickets */}
                {tickets.map((ticket) =>
                {

                    // Render the QueueTicket component for each ticket
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