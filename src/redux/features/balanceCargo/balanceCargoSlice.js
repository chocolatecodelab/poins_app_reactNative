import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { downloadingBalanceCargo, downloadingBalanceCargoHistory } from './balanceCargoService';

export const downloadingBalanceCargoAsync = createAsyncThunk(
    'downloadingBalanceCargoAsync', async (_, thunkAPI) => {
        try {
            return await downloadingBalanceCargo()
        } catch (error) {
            const message =
                (JSON.stringify(error.response) && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const downloadingBalanceCargoHistoryAsync = createAsyncThunk(
    'downloadingBalanceCargoHistoryAsync', async (_, thunkAPI) => {
        try {
            return await downloadingBalanceCargoHistory()
        } catch (error) {
            const message =
                (JSON.stringify(error.response) && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const balanceCargoSlice = createSlice({
    name: 'balanceCargo',
    initialState: {
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
        listBalanceCargo: [],
        listBalanceCargoHistory: [],
    },
    reducers: {
        resetBalanceCargo: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            state.listBalanceCargo = []
            state.listBalanceCargoHistory = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(downloadingBalanceCargoAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(downloadingBalanceCargoAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.listBalanceCargo = action.payload;
            })
            .addCase(downloadingBalanceCargoAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(downloadingBalanceCargoHistoryAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(downloadingBalanceCargoHistoryAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.listBalanceCargoHistory = action.payload;
            })
            .addCase(downloadingBalanceCargoHistoryAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {resetBalanceCargo} = balanceCargoSlice.actions
export default balanceCargoSlice.reducer