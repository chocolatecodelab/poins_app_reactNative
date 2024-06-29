import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import ForgetPasswordSlice from './features/forgetPassword/forgetPasswordSlice';
import RegisterSlice from './features/register/registerSlice';
import ProfileSlice from './features/profile/profileSlice';
import HomeSlice from './features/home/homeSlice';
import AuthSlice from './features/auth/authSlice';
import BarginOnlineSlice from './features/barginOnline/barginOnlineSlice';
import BargingRecapitulationSlice from './features/bargingRecapitulation/bargingRecapitulattionSlice';
import BargingScheduleSlice from './features/bargingSchedule/bargingScheduleSlice';
import ActiveBargingSlice from './features/activeBarging/activeBargingSlice';
import RealtimeCCTVSlice from './features/realtimeCCTV/realtimeCCTVSlice';
import HistoryBargingSlice from './features/historyBarging/historyBargingSlice';
import weatherSlice from './features/weather/weatherSlice';
import senslogSlice from './features/senslog/senslogSlice';
import deliveryCargoSlice from './features/deliveryCargo/deliveryCargoSlice';
import balanceCargoSlice from './features/balanceCargo/balanceCargoSlice';


const reducers = combineReducers({
    forgetPassword: ForgetPasswordSlice,
    auth: AuthSlice,
    register: RegisterSlice,
    profile: ProfileSlice,
    home: HomeSlice,
    barginOnline: BarginOnlineSlice,
    bargingRecapitulation: BargingRecapitulationSlice,
    bargingSchedule: BargingScheduleSlice,
    activeBarging: ActiveBargingSlice,
    realtimeCCTV: RealtimeCCTVSlice,
    historyBarging: HistoryBargingSlice,
    weather: weatherSlice,
    senslog: senslogSlice,
    deliveryCargo: deliveryCargoSlice,
    balanceCargo: balanceCargoSlice,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'profile',
        'home',
        'auth',
        'register',
        'barginOnline',
        'bargingRecapitulation',
        'realtimeCCTV',
        'historyBarging',
        'weather',
        'senslog',
        'deliveryCargo',
        'balanceCargo'
    ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);