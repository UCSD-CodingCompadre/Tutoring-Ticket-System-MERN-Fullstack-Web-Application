import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import authService from './authService';

// Hold the user from the local storage
const user = JSON.parse(localStorage.getItem('user'))

// Hold the slices initial state
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

/*
Register the user 
@param user the user data
@return object the user
*/
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) =>
{

    // Try to register the user
    try
    {
        return await authService.register(user);
    }

    // Else throw an Error using the thunkAPI
    catch(error)
    {
        const message = error.response.data.error;
        return thunkAPI.rejectWithValue(message);
    }
})

/*
Log in the user 
@param user the user data
@return object the user
*/
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) =>
{

    // Try to log in the user
    try
    {
        return await authService.signIn(user);
    }

    // Else thrown an Error using the thunkAPI
    catch(error)
    {
        const message = error.response.data.error;
        return thunkAPI.rejectWithValue(message);
    }
})

/*
Log out the user
@param none
@return none
*/
export const logout = createAsyncThunk('auth/logout', async() =>
{
    await authService.signOut();
})

// Hold the authSlice
export const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            reset: (state) =>
            {
                state.isLoading = false
                state.isError = false
                state.isSuccess = false
                state.message = ''
            },
        },
        
        // Set the state based on action stage
        extraReducers: (builder) => 
        {
            builder
                .addCase(register.pending, (state) =>
                {
                    state.isLoading = true;
                })
                .addCase(register.fulfilled, (state, action) =>
                {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.user = action.payload
                })
                .addCase(register.rejected, (state, action) =>
                {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    state.user = null;
                })
                .addCase(logout.fulfilled, (state, action) =>
                {
                    state.user = null;
                })
                .addCase(login.pending, (state) =>
                {
                    state.isLoading = true;
                })
                .addCase(login.fulfilled, (state, action) =>
                {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.user = action.payload
                })
                .addCase(login.rejected, (state, action) =>
                {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload;
                    state.user = null;
                })
        },
    }
)

export const {reset} = authSlice.actions;
export default authSlice.reducer;