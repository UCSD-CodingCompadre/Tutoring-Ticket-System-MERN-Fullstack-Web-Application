import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link}from 'react-router-dom';
import {reset} from '../utilities/ticketSlice';

export const Home = () =>
{

    // Hold the user from the redux store
    const {user} = useSelector(state => state.auth)
    
    // Hold the dispatch hook
    const dispatch = useDispatch();

    // Hold true if the user is a tutor
    const isTutor = user ? user.isAdmin : false;

    // Hold true if the user is a professor
    const isProfessor = user ? user.isProfessor : false;

    // Hold the useState for the reminder to sign up
    const [reminder, setReminder] = useState(user === null);
    
    // On render retrieve the student's tickets
    useEffect(() =>
    {

        return () => 
        {
            dispatch(reset());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    return (
        <>

            {/* Render two different pages depending if the user is logged in or not */}
            {user ? 
            <>

                {/* Hold the page container */}
                <div 
                className="page px-4 flex justify-center items-center flex flex-col w-screen"
                >

                    {/* Hold the Daisy UI phone component */}
                    <div 
                    className="mockup-phone border-primary h-[450px] w-[225px] text-sm"
                    >
                        <div 
                        className="camera"
                        >
                        </div> 
                        <div 
                        className="display h-full w-full"
                        >
                            <div 
                            className="artboard h-full w-full relative flex flex-col items-center justify-end relative"
                            >

                                {/* Conditional render the toasts depending if the user is a tutor */}
                                {
                                    isTutor &&
                                    <>
                                        <div 
                                        className="toast toast-top toast-start absolute top-6"
                                        >
                                            <div 
                                            className="alert alert-success w-28"
                                            >
                                                Is the ticket queue packed?
                                            </div>
                                        </div>
                                        <div 
                                        className="toast toast-top toast-end absolute top-32"
                                        >
                                            <div 
                                            className="alert alert-info w-28"
                                            >
                                                Why even ask that question.
                                            </div>
                                        </div>
                                    </>
                                }
                                {!isTutor && user && !isProfessor &&
                                <>
                                    <div 
                                    className="toast toast-top toast-start absolute top-6"
                                    >
                                        <div 
                                        className="alert alert-success w-28"
                                        >
                                            Need help on the PA?
                                        </div>
                                    </div>
                                    <div 
                                    className="toast toast-top toast-end absolute top-28"
                                    >
                                        <div 
                                        className="alert alert-info w-28"
                                        >
                                            Nah foo I am using Raul's new ticket system.
                                        </div>
                                    </div>
                                </>
                                }
                                {isTutor && isProfessor &&
                                    <>
                                        <div 
                                        className="toast toast-top toast-start absolute top-6"
                                        >
                                            <div 
                                            className="alert alert-success w-28"
                                            >
                                                Professor can I get more hours?
                                            </div>
                                        </div>
                                        <div 
                                        className="toast toast-top toast-end absolute top-32"
                                        >
                                            <div 
                                            className="alert alert-info w-28"
                                            >
                                                I'll have to think about it.
                                            </div>
                                        </div>
                                    </>
                                }
                                

                                {/* Conditional render the routes for the user depending if their a tutor or student */}
                                {isTutor && user && !isProfessor &&
                                    <>

                                        {/* Hold the route to view the all tickets */}
                                        <Link 
                                        className="btn btn-primary w-36 mb-4"
                                        to="/tutor-tickets"
                                        >
                                            View Tickets
                                        </Link>
                                    </>
                                }
                                {user && !isTutor &&
                                    <>
                                    {
                                        !user.hasSubmitted ? 
                                        
                                        // Hold the route to submit a ticket
                                        <Link 
                                        className="btn btn-primary w-36 mb-6"
                                        to="/new-ticket"
                                        >
                                            Submit a ticket
                                        </Link>
                                        :

                                        // Hold the route to check the student's ticket 
                                        <Link 
                                        className="btn btn-primary w-36 mb-6"
                                        to="/my-tickets"
                                        >
                                            Check my ticket
                                        </Link>
                                      }
                                    </>
                                }
                                {isProfessor &&
                                    <>
                                        
                                        {/* Hold the route to submit a ticket */}
                                        <Link 
                                        className="btn btn-primary w-36 mb-6"
                                        to="/edit-schedule"
                                        >
                                            Schedule manager
                                        </Link>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
            :
            <> 

                {/* Hold the page if there is no user logged in */}
                <div 
                className="page px-4 flex justify-center items-center flex flex-col w-screen"
                >
                    <div 
                    className="mockup-phone border-primary h-[450px] w-[225px] text-sm"
                    >
                        <div 
                        className="camera"
                        >
                            </div> 
                        <div 
                        className="display h-full w-full"
                        >
                            <div 
                            className="artboard h-full w-full relative"
                            >
                                <div 
                                className="toast toast-top toast-start relative mt-2"
                                >
                                    <div 
                                    className="alert alert-success w-24"
                                    >
                                        Hey foo how many tickets are there?
                                    </div>
                                </div>
                                <div 
                                className="toast toast-top toast-end relative"
                                >
                                    <div 
                                    className="alert alert-info w-28 ml-auto mr-0px"
                                    >
                                        There is approximately 420 tickets according to MongoDB. Better submit a ticket still 🚫👒.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Hold the Daisy UI modal component to remind the user to create an account */}
                    <input 
                    type="checkbox" 
                    defaultChecked={reminder} 
                    id="my-modal-3" 
                    className="modal-toggle" />
                    <div 
                    className="modal"
                    >
                        <div
                         className="modal-box relative"
                         >
                            <label 
                            htmlFor="my-modal-3" 
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                            onClick={() => setReminder(false)}>
                                ✕
                            </label>
                            <h3 
                            className="text-lg font-bold pt-4"
                            >
                                Welcome to CodingCocho's CSE/ECE Tutoring Center Ticket System
                            </h3>
                            <p 
                            className="py-4"
                            >
                                Thank you for checking out my application! Before we get to exploring the functionality lets's make on account!
                            </p>
                        </div>
                    </div>
            </div>
            </>
            }
        </>
    )
}