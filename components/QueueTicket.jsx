export const QueueTicket = (props) =>
{

    const {description, product, status, tutor} = props;

    return (
        <>

            {/* Hold the Daisy UI card component for the ticket*/}
            <div 
            className="card w-80 bg-neutral text-neutral-content mt-8"
            >
                <div 
                className="card-body items-center text-center"
                >
                    <h2 className="card-title">
                        {product}
                    </h2>
                    <p>
                        {description}
                    </p>
                    
                    {/* Conditional render the status of the ticket */}
                    {status === 'new' ? 
                    <>
                        <div 
                        className="alert alert-info shadow-lg"
                        >
                            <div>
                                <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                className="stroke-current flex-shrink-0 w-6 h-6"
                                >
                                    <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    >
                                        
                                    </path>
                                </svg>
                                <span
                                >
                                    Waiting for tutor
                                </span>
                            </div>
                        </div>
                    </>
                    :
                    <>
                    <div 
                        className="alert alert-success shadow-lg"
                        >
                            <div>
                                <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                className="stroke-current flex-shrink-0 w-6 h-6"
                                >
                                    <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    >
                                        
                                    </path>
                                </svg>
                               
                               {/* Display the tutor associated with the ticket */}
                               <span
                                >
                                    Accepted by {tutor}
                                </span>
                            </div>
                        </div>
                    </>
                    }
                </div>
            </div>
        </>
    )
}