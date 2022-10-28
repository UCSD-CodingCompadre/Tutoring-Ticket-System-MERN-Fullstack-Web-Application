import {Link} from 'react-router-dom';

export const StudentTicket = (props) =>
{

    // Deconstruct props
    const {id, description, product, status, tutor} = props;

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
                        <Link 
                        className="btn btn-primary" 
                        to="."
                        >
                            Edit
                        </Link>
                        {/* <Link className="btn btn-primary" to={`/my-tickets/${id}`}>Edit</Link> */}
                        
                        {/* Hold the button to delete this ticket from MongoDB */}
                        <button 
                        className="btn btn-primary"
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