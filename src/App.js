import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {
  LoginScreen, RegisterScreen, SplashScreen, OtpLoginScreen, BarginOnlineStepOneScreen,
  BarginOnlineStepTwoScreen, DetailHistory, OtpForgetPasswordScreen, ForgetPasswordScreen, ChangePasswordScreen, HistoryScreen,
} from "./screens";
import BottomTab from "./components/bottomTab/BottomTab";
import {
  NAV_NAME_HOME_MENU, NAV_NAME_LOGIN, NAV_NAME_REGISTER, NAV_NAME_OTP_LOGIN,
  NAV_NAME_BARGIN_ONLINE_STEP_ONE, NAV_NAME_BARGIN_ONLINE_STEP_TWO, NAV_NAME_BARGIN_ONLINE_STEP_THREE,
  NAV_NAME_OTP_FORGET_PASSWORD, NAV_NAME_SPLASH, NAV_NAME_FORGET_PASSWORD, NAV_NAME_CHANGE_NEW_PASSWORD, NAV_NAME_HISTORY
} from "./tools/constant";
import { NavigationContainer, } from '@react-navigation/native';
import NavigationService from './tools/navigationService';
import Linking from "./tools/linking";
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { LogBox } from 'react-native';

const Stack = createStackNavigator();

function MainNavigation() {
  LogBox.ignoreLogs(['Remote debugger']);
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
              name={NAV_NAME_BARGIN_ONLINE_STEP_ONE}
              component={BarginOnlineStepOneScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_BARGIN_ONLINE_STEP_TWO}
              component={BarginOnlineStepTwoScreen}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={NAV_NAME_BARGIN_ONLINE_STEP_THREE}
              component={DetailHistory}
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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