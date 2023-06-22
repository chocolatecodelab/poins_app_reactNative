import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import RegisterSlice from './features/register/registerSlice';
import ProfileSlice from './features/profile/profileSlice';
import HomeSlice from './features/home/homeSlice';
import AuthSlice from './features/auth/authSlice';
import BarginOnlineSlice from './features/barginOnline/barginOnlineSlice';
import HistoryBarginOnlineSlice from './features/history/historyBarginOnlineSlice';
import ForgetPasswordSlice from './features/forgetPassword/forgetPasswordSlice';

const reducers = combineReducers({
    auth: AuthSlice,
    register: RegisterSlice,
    profile: ProfileSlice,
    home: HomeSlice,
    barginOnline: BarginOnlineSlice,
    historyBarginOnline: HistoryBarginOnlineSlice,
    forgetPassword: ForgetPasswordSlice,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: [
    //     'profile', 
    //     'home',
    //     'auth',
    //     'register',
    //     'barginOnline',
    //     'historyBarginOnline'
    // ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);