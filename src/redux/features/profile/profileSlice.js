import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { downlodingProfile, updatingProfile, uploadImageProfile } from './profileService'

export const downlodingProfileAsync = createAsyncThunk(
    'downlodingProfileAsync', async (id, thunkAPI) => {
        try {
            return await downlodingProfile(id)
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
export const uploadImageProfileAsync = createAsyncThunk(
    'uploadImageProfileAsync', async (data, thunkAPI) => {
        try {
            return await uploadImageProfile(data)
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
export const updatingProfileAsync = createAsyncThunk(
    'updatingProfileAsync', async (data, thunkAPI) => {
        try {
            return await updatingProfile(data)
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

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        isError: false,
        isSuccess: false,
        isDownloading: false,
        isUpdatingProfile: false,
        isUpdatingProfileSuccess: false,
        isUpdatingImage: false,
        isUpdatingImageSuccess: false,
        data: {},
        message: '',
    },
    reducers: {
        resetProfile: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isDownloading = false;
            state.isUpdatingProfile = false;
            state.isUpdatingProfileSuccess = false;
            state.isUpdatingImage = false;
            state.isUpdatingImageSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(downlodingProfileAsync.pending, (state) => {
                state.isDownloading = true;
            })
            .addCase(downlodingProfileAsync.fulfilled, (state, action) => {
                state.isDownloading = false;
                state.data = action.payload;
            })
            .addCase(downlodingProfileAsync.rejected, (state, action) => {
                state.isDownloading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(uploadImageProfileAsync.pending, (state) => {
                state.isUpdatingImage = true;
            })
            .addCase(uploadImageProfileAsync.fulfilled, (state, action) => {
                state.isUpdatingImage = false;
                state.isUpdatingImageSuccess = true;
            })
            .addCase(uploadImageProfileAsync.rejected, (state, action) => {
                state.isUpdatingImage = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updatingProfileAsync.pending, (state) => {
                state.isUpdatingProfile = true;
            })
            .addCase(updatingProfileAsync.fulfilled, (state, action) => {
                state.isUpdatingProfile = false;
                state.isUpdatingProfileSuccess = true;
            })
            .addCase(updatingProfileAsync.rejected, (state, action) => {
                state.isUpdatingProfile = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
})

export const { resetProfile } = profileSlice.actions
export default profileSlice.reducer