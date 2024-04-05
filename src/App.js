import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  LoginScreen, RegisterScreen, SplashScreen, OtpLoginScreen, BargingOnlineStepOneScreen, BargingOnlineStepTwoScreen,
  OtpForgetPasswordScreen, ForgetPasswordScreen, ChangePasswordScreen, HistoryDetailScreen, ProfileScreen,
  BargingRecapitulationScreen,
  BargingScheduleScreen,
  NotificationScreen,
  CCTVScreen,
  DetailCCTVScreen,
  HistoryBargingScreen,
} from "./screens";
import BottomTab from "./components/bottomTab/BottomTab";
import {
  NAV_NAME_HOME_MENU, NAV_NAME_LOGIN, NAV_NAME_REGISTER, NAV_NAME_OTP_LOGIN, NAV_NAME_BARGING_ONLINE_STEP_ONE,
  NAV_NAME_BARGING_ONLINE_STEP_TWO, NAV_NAME_OTP_FORGET_PASSWORD, NAV_NAME_SPLASH, NAV_NAME_FORGET_PASSWORD,
  NAV_NAME_CHANGE_NEW_PASSWORD, NAV_NAME_BARGING_RECAPITULATION_DETAIL, NAV_NAME_PROFILE, NAV_NAME_BARGING_RECAPITULATION, NAV_NAME_BARGING_SCHEDULE, NAV_NAME_NOTIFICATION, NAV_NAME_CCTV, NAV_NAME_DETAIL_CCTV, NAV_NAME_HISTORY_BARGING
} from "./tools/constant";
import { NavigationContainer, } from '@react-navigation/native';
import NavigationService from './tools/navigationService';
import Linking from "./tools/linking";
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { LogBox } from 'react-native';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { requestPermission } from './tools/helper';

const Stack = createStackNavigator();

function MainNavigation() {
  LogBox.ignoreLogs(['Remote debugger']);

  useEffect(() => {
    requestPermission();
    notifee.requestPermission();
    const onMessageReceived = async (message) => {
      console.log(message);
      if (message) {
          await notifee.createChannel({
              id: 'default9',
              name: 'Default Channel 9',
              importance: AndroidImportance.HIGH,
              sound: "cute_sound",
              badge: true,
            });
          await notifee.displayNotification(JSON.parse(message.data.notifee));
      }
  }
  
  messaging().onMessage(onMessageReceived);
    
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={NavigationService.navigationRef} linking={Linking}>
          <Stack.Navigator initialRouteName={NAV_NAME_SPLASH} >
            <Stack.Screen
              name={NAV_NAME_SPLASH}
              component={SplashScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_HOME_MENU}
              component={BottomTab}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_LOGIN}
              component={LoginScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_OTP_LOGIN}
              component={OtpLoginScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_REGISTER}
              component={RegisterScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_FORGET_PASSWORD}
              component={ForgetPasswordScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_OTP_FORGET_PASSWORD}
              component={OtpForgetPasswordScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_CHANGE_NEW_PASSWORD}
              component={ChangePasswordScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_BARGING_ONLINE_STEP_ONE}
              component={BargingOnlineStepOneScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_BARGING_ONLINE_STEP_TWO}
              component={BargingOnlineStepTwoScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_BARGING_RECAPITULATION_DETAIL}
              component={HistoryDetailScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_PROFILE}
              component={ProfileScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_BARGING_RECAPITULATION}
              component={BargingRecapitulationScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_HISTORY_BARGING}
              component={HistoryBargingScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_BARGING_SCHEDULE}
              component={BargingScheduleScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_NOTIFICATION}
              component={NotificationScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_CCTV}
              component={CCTVScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_DETAIL_CCTV}
              component={DetailCCTVScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default MainNavigation;