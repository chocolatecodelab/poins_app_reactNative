import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { downloadBargingRecapitulation, downloadingExport } from './bargingRecapitulationService'

export const downloadingBargingRecapitulationAsync = createAsyncThunk(
    'bargingRecapitulation', async (params, thunkAPI) => {
        try {
            return await downloadBargingRecapitulation(params)
        } catch (error) {
            const message =
                (JSON.stringify(error.response) &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    });

    export const downloadingExportAsync = createAsyncThunk(
        'bargingRecapitulation/Excel', async (params, thunkAPI) => {
            try {
                return await downloadingExport(params)
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

export const bargingRecapitulationSlice = createSlice({
    name: 'bargingRecapitulation',
    initialState: {
        listHistory: [],
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
    },
    reducers: {
        resetBargingRecapitulation: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(downloadingBargingRecapitulationAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(downloadingBargingRecapitulationAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.listHistory = action.payload
            })
            .addCase(downloadingBargingRecapitulationAsync.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(downloadingExportAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(downloadingExportAsync.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(downloadingExportAsync.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { resetBargingRecapitulation } = bargingRecapitulationSlice.actions
export default bargingRecapitulationSlice.reducer