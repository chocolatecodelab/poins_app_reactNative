import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { downloadHistoryBarginOnline } from './historyBarginOnlineService'

export const downloadingHistoryBarginOnlineAsync = createAsyncThunk(
    'history', async (params, thunkAPI) => {
        try {
            return await downloadHistoryBarginOnline(params)
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

export const historyBarginOnlineSlice = createSlice({
    name: 'historyBarginOnline',
    initialState: {
        listHistory: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
    },
    reducers: {
        resetHistoryBarginOnline: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(downloadingHistoryBarginOnlineAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(downloadingHistoryBarginOnlineAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.listHistory = action.payload
            })
            .addCase(downloadingHistoryBarginOnlineAsync.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { resetHistoryBarginOnline } = historyBarginOnlineSlice.actions
export default historyBarginOnlineSlice.reducer