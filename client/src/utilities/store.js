import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../utilities/authSlice';
import ticketReducer from '../utilities/ticketSlice';

// Hold the Redux store
export const store = configureStore(
    {

        // Pass in the state slices
        reducer: 
        {
            auth: authReducer,
            ticket: ticketReducer
        },
    }
)
