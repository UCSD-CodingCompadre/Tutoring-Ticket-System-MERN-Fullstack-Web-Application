import {NavLink} from 'react-router-dom';
import {GoCalendar, GoHome, GoNote} from 'react-icons/go';

export const Footer = () =>
{
    return (
        <>
            
            {/* Hold Daisy UI bottom navigation component */}
            <div className="btm-nav bg-primary">
                
                {/* Hold route to go to Home page */}
                <NavLink
                className={({isActive}) => isActive ? "active bg-primary text-primary-content" : "bg-primary text-primary-content"}
                to="/"
                >
                    <GoHome 
                    className="text-xl"
                    />
                </NavLink>

                {/* Hold route to go to Schedule page*/}
                <NavLink 
                className={({isActive}) => isActive ? "active bg-primary text-primary-content" : "bg-primary text-primary-content"}
                to="/schedule"
                >
                    <GoCalendar 
                    className="text-xl"
                    />
                </NavLink>
                
                {/* Hold route to go to Queue page*/}
                <NavLink
                className={({isActive}) => isActive ? "active bg-primary text-primary-content" : "bg-primary text-primary-content"}
                to="/queue"
                >
                    <GoNote 
                    className="text-xl"
                    />
                </NavLink>
            </div>
        </>
    )
}