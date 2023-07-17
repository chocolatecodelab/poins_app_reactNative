import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { downloadBargingActive } from './activeBargingService'

export const downloadingActiveBargingAsync = createAsyncThunk(
    'bargingActive', async (params, thunkAPI) => {
        try {
            return await downloadBargingActive(params)
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

export const bargingActiveSlice = createSlice({
    name: 'bargingActive',
    initialState: {
        listHistory: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
    },
    reducers: {
        resetBargingActive: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
        onChangeData: (state, action) => {
            state.listHistory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(downloadingActiveBargingAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(downloadingActiveBargingAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.listHistory = action.payload
            })
            .addCase(downloadingActiveBargingAsync.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { resetBargingActive, onChangeData } = bargingActiveSlice.actions
export default bargingActiveSlice.reducer