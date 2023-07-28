import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { uploadLogin, uploadOtpLogin } from './authService'

// Login user
export const uploadLoginAsync = createAsyncThunk(
    'auth/login', async (data, thunkAPI) => {
        try {
            return await uploadLogin(data)
        } catch (error) {
            const message =
                (JSON.stringify(error.response) &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })
export const uploadOtpLoginAsync = createAsyncThunk(
    'auth/otp', async (data, thunkAPI) => {
        try {
            return await uploadOtpLogin(data)
        } catch (error) {
            const message =
                (JSON.stringify(error.response) &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loginInfo: null,
        email: '',
        password: '',
        isError: false,
        isSuccess: false,
        isLoading: false,
        forgetPasswordInfo: null,
        message: '',
    },
    reducers: {
        resetAuth: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
        resetLogin: (state) => {
            state.email = ''
            state.password = ''
        },
        logout: (state) => {
            state.loginInfo = null
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
        setEmail: (state, action) => { state.email = action.payload },
        setPassword: (state, action) => { state.password = action.payload },
        tempDataTester: (state, action) => {
            state.loginInfo = action.payload
        },
        resetAllDataAuth: (state) => {
            state.loginInfo = null;
            state.email = '';
            state.password = '';
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.forgetPasswordInfo = null;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadLoginAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(uploadLoginAsync.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(uploadLoginAsync.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(uploadOtpLoginAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(uploadOtpLoginAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.loginInfo = action.payload.Data
            })
            .addCase(uploadOtpLoginAsync.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { resetAuth, resetLogin, resetOtpLogin, setEmail, setPassword, logout, tempDataTester, resetAllDataAuth } = authSlice.actions
export default authSlice.reducer