export const TutorTicket = (props) =>
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
                        {product}</h2>
                    <p>
                        {description}
                    </p>
                    <div 
                    className="card-actions justify-end"
                    >
                    
                        {/* Hold button to change status of ticket */}
                        <button 
                        className="btn btn-primary"
                        >
                            Accept
                        </button>
                    </div>

                    {/* Hold the Daisy UI alert component to check if the ticket has been accepted */}
                    <div 
                    className="alert shadow-lg text-left text-xs"
                    >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <p>{status === 'new' ? 'Ticket has not been accepted' : `Ticket has been accepted by ${tutor}`} </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}