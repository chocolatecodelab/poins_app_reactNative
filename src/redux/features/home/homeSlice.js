import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { downlodingCheckVersion, downlodingMenu, updateMenu } from './homeService'

export const downlodingMenuAppsAsync = createAsyncThunk(
    'downlodingMenuAppsAsync', async (_, thunkAPI) => {
        try {
            return await downlodingMenu()
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

export const downlodingCheckVersionAsync = createAsyncThunk(
    'downlodingCheckVersionAsync', async (_, thunkAPI) => {
        try {
            return await downlodingCheckVersion()
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

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        isErrorApps: false,
        isDownloadingApps: false,
        isErrorVersion: false,
        isDownloadingVersion: false,
        apps: {},
        versions: {},
        message: '',
    },
    reducers: {
        resetHome: (state) => {
            state.isErrorApps = false;
            state.isDownloadingApps = false;
            state.isErrorVersion = false;
            state.isDownloadingVersion = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(downlodingMenuAppsAsync.pending, (state) => {
                state.isDownloadingApps = true;
            })
            .addCase(downlodingMenuAppsAsync.fulfilled, (state, action) => {
                state.isDownloadingApps = false;
                state.apps = action.payload;
            })
            .addCase(downlodingMenuAppsAsync.rejected, (state, action) => {
                state.isDownloadingApps = false;
                state.isErrorApps = true;
                state.message = action.payload;
            })
            .addCase(downlodingCheckVersionAsync.pending, (state) => {
                state.isDownloadingVersion = true;
            })
            .addCase(downlodingCheckVersionAsync.fulfilled, (state, action) => {
                state.isDownloadingVersion = false;
                state.versions = action.payload;
            })
            .addCase(downlodingCheckVersionAsync.rejected, (state, action) => {
                state.isDownloadingVersion = false;
                state.isErrorVersion = true;
                state.message = action.payload;
            })
    },
})

export const { resetHome } = homeSlice.actions
export default homeSlice.reducer