import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { uploadEmailForgetPassword, uploadNewPassword, uploadValidateOtpForgetPassword } from './forgetPasswordService'

export const uploadEmailForgetPasswordAsync = createAsyncThunk(
    'forgetPassword/validateEmail', async (data, thunkAPI) => {
        try {
            return await uploadEmailForgetPassword(data)
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

export const uploadValidateOtpForgetPasswordAsync = createAsyncThunk(
    'forgetPassword/validateOtp', async (data, thunkAPI) => {
        try {
            return await uploadValidateOtpForgetPassword(data)
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

export const uploadNewPasswordAsync = createAsyncThunk(
    'forgetPassword/newPassword', async (data, thunkAPI) => {
        try {
            return await uploadNewPassword(data)
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

export const forgetPasswordSlice = createSlice({
    name: 'forgetPassword',
    initialState: {
        email: '',
        isError: false,
        isSuccess: false,
        isLoading: false,
        forgetPasswordInfo: null,
        message: '',
    },
    reducers: {
        resetStateForgetPassword: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
        resetAllForgetPassword: (state) => {
            state.email = ''
            state.forgetPasswordInfo = null
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
        setEmail: (state, action) => { state.email = action.payload },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadEmailForgetPasswordAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(uploadEmailForgetPasswordAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.forgetPasswordInfo = action.payload.Data
            })
            .addCase(uploadEmailForgetPasswordAsync.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(uploadValidateOtpForgetPasswordAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(uploadValidateOtpForgetPasswordAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(uploadValidateOtpForgetPasswordAsync.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(uploadNewPasswordAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(uploadNewPasswordAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(uploadNewPasswordAsync.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { setEmail, resetStateForgetPassword, resetAllForgetPassword } = forgetPasswordSlice.actions
export default forgetPasswordSlice.reducer