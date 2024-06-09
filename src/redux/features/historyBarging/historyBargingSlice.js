import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { downloadingHistoryBarging } from './historyBargingService'

export const downloadingHistoryBargingAsync = createAsyncThunk(
    'downloadingHistoryBargingAsync', async (companyUserId, thunkAPI) => {
        try {
            return await downloadingHistoryBarging(companyUserId)
        } catch (error) {
            const message = 
            (JSON.stringify(error.response) && error.response.data && error.response.data.message) || error.message || error.toString() 
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const historyBargingSlice = createSlice({
    name: 'historyBarging',
    initialState: {
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
        listHistoryBarging: [],
    },
    reducers: {
        resetHistoryBarging: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            state.listHistoryBarging = [] //percobaan
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(downloadingHistoryBargingAsync.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(downloadingHistoryBargingAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.listHistoryBarging = action.payload;
        })
        .addCase(downloadingHistoryBargingAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    },
})

export const {resetHistoryBarging} = historyBargingSlice.actions
export default historyBargingSlice.reducer