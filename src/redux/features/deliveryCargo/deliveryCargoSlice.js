import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { downloadingDeliveryCargo, downloadingExport } from './deliveryCargoService'

export const downloadingDeliveryCargoAsync = createAsyncThunk(
    'downloadingDeliveryCargoAsync', async (params, thunkAPI) => {
        try {
            return await downloadingDeliveryCargo(params)
        } catch (error) {
            const message =
                (JSON.stringify(error.response) && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const downloadingExportAsync = createAsyncThunk(
    'downloadingExportDeliveryCargoAsync', async (params, thunkAPI) => {
        try {
            return await downloadingExport(params)
        } catch (error) {
            const message =
                (JSON.stringify(error.response) && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deliveryCargoSlice = createSlice({
    name: 'deliveryCargo',
    initialState: {
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
        listDeliveryCargo: [],
    },
    reducers: {
        resetDeliveryCargo: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            state.listDeliveryCargo = [] 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(downloadingDeliveryCargoAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(downloadingDeliveryCargoAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.listDeliveryCargo = action.payload;
            })
            .addCase(downloadingDeliveryCargoAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
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

export const { resetDeliveryCargo } = deliveryCargoSlice.actions
export default deliveryCargoSlice.reducer