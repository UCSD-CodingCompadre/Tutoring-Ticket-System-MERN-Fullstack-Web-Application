import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom';
import {getSpecificTicket, reset} from '../utilities/ticketSlice';
import {Spinner} from '../components/Spinner';
import {Ticket} from '../components/StudentTicket';
import {toast} from 'react-toastify';

export const EditTicket = () =>
{

    const {ticket, isLoading, isError, isSuccess, message} = useSelector((state) => state.ticket);

    const params = useParams();
    const dispatch = useDispatch();
    const id = params.id;

    useEffect(() =>
    {
        if(isError)
        {
            toast.error(message, {theme: "colored"});
        }

        dispatch(getSpecificTicket(id))
    },[isError, message, id, dispatch])

    if(isLoading)
    {
        return (
            <Spinner />
        )
    }

    return (
        <>
            <div 
            className="page px-4 w-screen"
            >
                
            </div>
        </>
    )
}