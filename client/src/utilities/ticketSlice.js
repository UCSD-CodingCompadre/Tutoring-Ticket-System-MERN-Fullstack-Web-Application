import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ticketService from './ticketService';

// Hold the initial state for the tickets state
const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

/*
Create a ticket
@param ticketData the data of the ticket
@return object the ticket
*/
export const createTicket = createAsyncThunk('tickets/create', async(ticketData, thunkAPI) =>
{

    // Try to create a ticket
    try
    {

        // Hold the JWT of the user creating the ticket
        const token = thunkAPI.getState().auth.user.token;

        return await ticketService.createTicket(ticketData, token);
    }

    // Else thrown an Error
    catch(error)
    {
        const message = error.response.data.error;
        return thunkAPI.rejectWithValue(message);
    }
})

/*
Get all the student's tickets
@param none
@return array the student's tickets
*/
export const getUserTickets = createAsyncThunk('tickets/getMyTickets', async(_, thunkAPI) =>
{

    // Try to get all the student's tickets
    try
    {

        // Hold the JWT of the student to find the tickets
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.getMyTickets(token);
    }

    // Else throw an Error
    catch(error)
    {
        const message = error.response.data.error;
        return thunkAPI.rejectWithValue(message);
    }
})

/*
Get a specific ticket from a student
@param ticketId the id of the ticket
@return object the ticket if it is found
*/
export const getSpecificTicket = createAsyncThunk('tickets/getATicket', async(ticketId, thunkAPI) =>
{

    // Try to get the single ticket
    try
    {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.getATicket(ticketId, token);
    }

    // Else throw an Error
    catch(error)
    {
        const message = error.response.data.error;
        return thunkAPI.rejectWithValue(message);
    }
})


/*
Get all the tickets for the tutor
@param none
@return arr all the tickets
*/
export const getAllTickets = createAsyncThunk('tickets/getAllTickets', async(_, thunkAPI) =>
{

    // Try to get the all the tickets
    try
    {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.getAllTickets(token);
    }

    // Else throw an Error
    catch(error)
    {
        const message = error.response.data.error;
        return thunkAPI.rejectWithValue(message);
    }
})

// Hold the ticketSlice
export const ticketSlice = createSlice(
    {
        name: 'ticket',
        initialState,
        reducers:
        {
            reset: (state) => 
            {
                state.tickets = []
                state.ticket = {}
                state.isError = false
                state.isSuccess = false
                state.isLoading = false
                state.message = ''
            }
        },
        
        // Set the state based on action stage
        extraReducers: (builder) =>
        {
            builder
                .addCase(createTicket.pending, (state) =>
                {
                    state.isLoading = true
                })
                .addCase(createTicket.fulfilled, (state) =>
                {
                    state.isLoading = false;
                    state.isSuccess = true;
                })
                .addCase(createTicket.rejected, (state, action) =>
                {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                })
                .addCase(getUserTickets.pending, (state) =>
                {
                    state.isLoading = true
                })
                .addCase(getUserTickets.fulfilled, (state, action) =>
                {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.tickets = action.payload;
                })
                .addCase(getUserTickets.rejected, (state, action) =>
                {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                })
                .addCase(getSpecificTicket.pending, (state) =>
                {
                    state.isLoading = true
                })
                .addCase(getSpecificTicket.fulfilled, (state, action) =>
                {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.ticket = action.payload;
                })
                .addCase(getSpecificTicket.rejected, (state, action) =>
                {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                })
                .addCase(getAllTickets.pending, (state) =>
                {
                    state.isLoading = true
                })
                .addCase(getAllTickets.fulfilled, (state, action) =>
                {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.tickets = action.payload;
                })
                .addCase(getAllTickets.rejected, (state, action) =>
                {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                })
        }
    }
)

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer;