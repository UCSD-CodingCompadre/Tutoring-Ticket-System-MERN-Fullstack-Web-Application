export const ErrorPage = () =>
{
    return (
        <>
            <div 
            className="page flex items-center justify-center px-8"
            >
                <div 
                className="alert alert-error shadow-lg"
                >
                    <div
                    >
                        <svg 
                        className="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                        >
                            <path 
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2"  />
                            </svg>
                        <span
                        >
                            Error! This functionality does not exist.
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}