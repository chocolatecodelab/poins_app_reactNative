import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { downloadCustomer, downloadListBooking, downloadTimeBooking, uploadAddBarge, uploadAddTugboat, uploadBargin } from './barginOnlineService'

export const downloadingCustomerAsync = createAsyncThunk(
    'barginOnline/customer', async (_, thunkAPI) => {
        try {
            return await downloadCustomer()
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

export const uploadingAddBargeAsync = createAsyncThunk(
    'barginOnline/addBarge', async (params, thunkAPI) => {
        try {
            return await uploadAddBarge(params)
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

export const uploadingAddTugBoatAsync = createAsyncThunk(
    'barginOnline/addTugboat', async (params, thunkAPI) => {
        try {
            return await uploadAddTugboat(params)
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

export const uploadingBarginAsync = createAsyncThunk(
    'barginOnline/create', async (data, thunkAPI) => {
        try {
            return await uploadBargin(data)
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

export const downloadingListBookingAsync = createAsyncThunk(
    'barginOnline/listBooking', async (params, thunkAPI) => {
        try {
            return await downloadListBooking(params)
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

export const downloadingTimeBookingAsync = createAsyncThunk(
    'barginOnline/listTime', async (params, thunkAPI) => {
        try {
            return await downloadTimeBooking(params)
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

export const barginOnlineSlice = createSlice({
    name: 'barginOnline',
    initialState: {
        customers: [],
        listBooking: [],
        listTime: {},
        isError: false,
        isSuccess: false,
        isLoading: false,
        isUploading: false,
        isUploadingSuccess: false,
        isLoadingTimeBooking: false,
        isUploadingSuccessBargeTugboat: false,
        message: '',
    },
    reducers: {
        resetStatuBarginOnline: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.isUploading = false
            state.isUploadingSuccess = false
            state.isUploadingSuccessBargeTugboat = false;
            state.isLoadingTimeBooking = false
            state.message = ''
        },
        resetDataBarginOnline: (state) => {
            state.listBooking = []
            state.listTime = []
            state.customers = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(downloadingCustomerAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(downloadingCustomerAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.customers = action.payload
            })
            .addCase(downloadingCustomerAsync.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(uploadingAddBargeAsync.pending, (state) => {
                state.isUploading = true;
            })
            .addCase(uploadingAddBargeAsync.fulfilled, (state) => {
                state.isUploading = false;
                state.isUploadingSuccessBargeTugboat = true;
            })
            .addCase(uploadingAddBargeAsync.rejected, (state, action) => {
                state.isUploading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(uploadingAddTugBoatAsync.pending, (state) => {
                state.isUploading = true;
            })
            .addCase(uploadingAddTugBoatAsync.fulfilled, (state) => {
                state.isUploading = false;
                state.isUploadingSuccessBargeTugboat = true;
            })
            .addCase(uploadingAddTugBoatAsync.rejected, (state, action) => {
                state.isUploading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(uploadingBarginAsync.pending, (state) => {
                state.isUploading = true
            })
            .addCase(uploadingBarginAsync.fulfilled, (state) => {
                state.isUploading = false
                state.isUploadingSuccess = true
            })
            .addCase(uploadingBarginAsync.rejected, (state, action) => {
                state.isUploading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(downloadingListBookingAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(downloadingListBookingAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.listBooking = action.payload
            })
            .addCase(downloadingListBookingAsync.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(downloadingTimeBookingAsync.pending, (state) => {
                state.isLoadingTimeBooking = true
            })
            .addCase(downloadingTimeBookingAsync.fulfilled, (state, action) => {
                state.isLoadingTimeBooking = false
                state.isSuccess = true
                state.listTime = action.payload
            })
            .addCase(downloadingTimeBookingAsync.rejected, (state, action) => {
                state.isLoadingTimeBooking = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { resetStatuBarginOnline, resetDataBarginOnline } = barginOnlineSlice.actions
export default barginOnlineSlice.reducer