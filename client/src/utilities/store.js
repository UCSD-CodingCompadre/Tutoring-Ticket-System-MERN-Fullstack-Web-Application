import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist';
import authReducer from '../utilities/authSlice';
import ticketReducer from '../utilities/ticketSlice';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage
}

const appReducer = combineReducers(
    {
        auth: authReducer,
        ticket: ticketReducer
    }
)

const persistedReducer = persistReducer(persistConfig, appReducer);

// Hold the Redux store
export const store = configureStore(
    {
        
        // Pass in the state slices
        reducer: persistedReducer,
        middleware: [thunk]
    }
)

export const persister = persistStore(store);
