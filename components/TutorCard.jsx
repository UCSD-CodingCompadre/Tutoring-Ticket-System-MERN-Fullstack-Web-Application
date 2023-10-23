export const TutorCard = (props) =>
{

    // Deconstruct the props
    const {name, status} = props;

    return (
        <>

            {/* Conditional render the tutor's status */}
            {status ?
                <>
                    <div className="alert alert-error mt-2">
                        {name} is busy
                    </div>
                </>
                :
                <>
                    <div className="alert alert-info mt-2">
                        {name} is free
                    </div>
                </>
            }
        </>
    )
}