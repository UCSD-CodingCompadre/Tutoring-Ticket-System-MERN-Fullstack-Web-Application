export const TutorCard = (props) =>
{

    const {name, status} = props;

    return (
        <>
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