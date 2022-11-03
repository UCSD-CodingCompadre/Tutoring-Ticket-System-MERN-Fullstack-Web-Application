import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserTickets, reset} from '../utilities/ticketSlice';
import {Spinner} from '../components/Spinner';
import {StudentTicket}  from '../components/StudentTicket';

export const StudentTickets = () =>
{

    const {user} = useSelector((state) => state.auth);

    // Deconstruct the ticket state
    const {tickets, isLoading, isSuccess} = useSelector((state) => state.ticket);

    // Hold the dispatch hook
    const dispatch = useDispatch();

    // On unmount reset the ticket state
    useEffect(() => 
    {
        return () =>
        {
            
            if(isSuccess)
            {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    // On render retrieve the student's tickets
    useEffect(() =>
    {
        dispatch(getUserTickets());

    }, [dispatch])

    // Check if the tickets are loading
    if(isLoading)
    {
        return (
            <Spinner />
        )
    }

    return (
        <>
            
            {/* Hold the page to render the student's tickets */}
            <div 
            className="page px-4 flex justify-center items-center flex flex-col w-screen"
            >

                {/* Map out the student's tickets */}
                {tickets.map((ticket) =>
                {

                    // Render the StudentTicket component and pass props
                    return  (
                        <StudentTicket 
                        description={ticket.description}
                        id={ticket._id}
                        key={ticket._id}
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