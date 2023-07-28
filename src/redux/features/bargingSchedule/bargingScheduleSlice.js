import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { downloadBargingSchedule } from './bargingScheduleService'

export const downloadingBargingScheduleAsync = createAsyncThunk(
    'bargingSchedule', async (params, thunkAPI) => {
        try {
            return await downloadBargingSchedule(params)
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

export const bargingScheduleSlice = createSlice({
    name: 'bargingSchedule',
    initialState: {
        listHistory: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
    },
    reducers: {
        resetBargingSchedule: (state) => {
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
            .addCase(downloadingBargingScheduleAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(downloadingBargingScheduleAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.listHistory = action.payload
            })
            .addCase(downloadingBargingScheduleAsync.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { resetBargingSchedule, onChangeData } = bargingScheduleSlice.actions
export default bargingScheduleSlice.reducer