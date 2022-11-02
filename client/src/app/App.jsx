import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Footer} from '../components/Footer';
import {Navbar} from '../components/Navbar';
import {PrivateRoute} from '../components/PrivateRoute';
import {RedirectRoute} from '../components/RedirectRoute';
import {EditTicket} from '../pages/EditTicket';
import {ErrorPage} from '../pages/ErrorPage';
import {Home} from '../pages/Home';
import {Register}from '../pages/Register';
import {SignIn} from '../pages/SignIn';
import {StudentTickets} from '../pages/StudentTickets';
import {TicketForm} from '../pages/TicketForm';
import {TicketQueue} from '../pages/TicketQueue';
import {TutorTickets} from '../pages/TutorTickets';
import {ZoomRoom} from '../pages/ZoomRoom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() 
{
  return (
    <>

      {/* Establish a route network for the application */}
      <BrowserRouter>
        
        {/* Hold the main of the front end */}
        <main
        className="flex flex-col h-full min-h-screen"
        >

          {/* Hold the Navbar Component */}
          <Navbar />

          {/* Establish the routes for the network */}
          <Routes>

            {/* Establish the home route */}
            <Route element={<Home />} path="/"></Route>
            
            {/* Establish route to register a user */}
            <Route element={<Register />} path="/register"></Route>
            
            {/* Establish route to sign in a user */}
            <Route element={<SignIn />} path="/signin"></Route>
            
            {/* Establish route to prevent unauthorized users */}
            <Route element={<RedirectRoute />} path="/new-ticket">
                
                {/* Establish route to create a new ticket */}
                <Route element={<TicketForm />} path="/new-ticket"></Route>
            </Route>
            
            {/* Establish route to prevent unauthorized users */}
            <Route element={<PrivateRoute />} path="/my-tickets">
              
              {/* Establish route to check student's tickets */}
              <Route element={<StudentTickets />} path="/my-tickets"></Route>
            </Route>

            {/* Establish route to prevent unauthorized users */}
            <Route element={<PrivateRoute />} path="/my-tickets/:id">
              
              {/* Establish route to edit so student can edit their ticket */}
              <Route element={<EditTicket />} path="/my-tickets/:id"></Route>
            </Route>

            {/* Establish route to prevent unauthorized users */}
            <Route element={<PrivateRoute />} path="/tutor-tickets">
              
              {/* Establish route to see all tickets for tutor */}
              <Route element={<TutorTickets />} path="/tutor-tickets"></Route>
            </Route>

            {/* Establish route to prevent unauthorized users */}
            <Route element={<PrivateRoute />} path="/tutor-tickets/:tutor">
              
              {/* Establish route to edit so student can edit their ticket */}
              <Route element={<ZoomRoom />} path="/tutor-tickets/:tutor"></Route>
            </Route>

            {/* Establish the route to see all the tickets in queue */}
            <Route element={<TicketQueue />} path="/queue"></Route>
            
            {/* Establish the route for any unrecognized route*/}
            <Route element={<ErrorPage />} path="/*"></Route>
          </Routes>
        </main>

        {/* Hold the Footer component */}
        <Footer />

        {/* Allow toasts to be used in the application */}
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
