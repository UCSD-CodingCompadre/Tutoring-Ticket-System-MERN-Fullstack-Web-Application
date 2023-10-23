export const Spinner = () =>
{
    return (
        <>
            
            {/* Hold Tailwind Elements spinner component for loading purposes */}
            <div 
            className="page flex justify-center items-center"
            >
                <div 
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-color text-" 
                role="status"
                >
                    <span 
                    className="visually-hidden"
                    >
                        Loading...
                    </span>
                </div>
            </div>
        </>
    )
}
