import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { downlodingCCTV } from './realtimeCCTVService'

export const downlodingRealtimeCCTVAsync = createAsyncThunk(
    'downlodingRealtimeCCTVAsync', async (_, thunkAPI) => {
        try {
            return await downlodingCCTV()
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

export const realtimeCCTVSlice = createSlice({
    name: 'cctv',
    initialState: {
        isError: false,
        isSuccess: false,
        isDownloading: false,
        data: [],
        message: '',
    },
    reducers: {
        resetStatusCCTV: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isDownloading = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(downlodingRealtimeCCTVAsync.pending, (state) => {
                state.isDownloading = true;
            })
            .addCase(downlodingRealtimeCCTVAsync.fulfilled, (state, action) => {
                state.isDownloading = false;
                state.data = action.payload;
            })
            .addCase(downlodingRealtimeCCTVAsync.rejected, (state, action) => {
                state.isDownloading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
})

export const { resetStatusCCTV } = realtimeCCTVSlice.actions
export default realtimeCCTVSlice.reducer