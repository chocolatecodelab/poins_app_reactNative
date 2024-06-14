import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { downloadingWeather } from './weatherService';

export const downloadingWeatherAsync = createAsyncThunk(
    'downloadingWeatherAsync', async (_, thunkAPI) => {
        try {
            return await downloadingWeather()
        } catch (error) {
            const message =
            (JSON.stringify(error.response) && error.response.data && error.response.data.message) || error.message || error.toString() 
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
        weather: [],
    },
    reducers: {
        resetWeather: (state) => {
            state.isError = false,
            state.isSuccess = false,
            state.isLoading = false,
            state.message = '',
            state.weather = []
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(downloadingWeatherAsync.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(downloadingWeatherAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.weather = action.payload;
        })
        .addCase(downloadingWeatherAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    },

})

export const {resetWeather} = weatherSlice.actions
export default weatherSlice.reducer;