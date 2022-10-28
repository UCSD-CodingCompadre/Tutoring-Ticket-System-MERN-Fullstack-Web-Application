import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllTickets, reset} from '../utilities/ticketSlice';
import {Spinner} from '../components/Spinner';
import {TutorTicket}  from '../components/TutorTicket';

export const TutorTickets = () =>
{

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

   // On render retrieve the all the tickets
    useEffect(() =>
    {
        dispatch(getAllTickets());
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

            {/* Hold the page so the tutor can see all the tickets */}
            <div 
            className="page px-4 flex justify-center items-center flex flex-col w-screen"
            >

                {/* Map out the all the tickets*/}
                {tickets.map((ticket) =>
                {

                    // Render the TutorTicket component and pass props
                    return  (
                        <TutorTicket 
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