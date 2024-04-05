import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { iconTools, ios, iPad } from '../../tools/helper';
import {
  COLOR_DISABLED, COLOR_GRAY_1, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_TRANSPARENT_SECONDARY, COLOR_WHITE,
  FONT_POPPINS_REGULAR,
  NAV_NAME_BARGING_RECAPITULATION,
  NAV_NAME_HISTORY_BARGING,
  NAV_NAME_HOME,
  NAV_NAME_PROFILE,
} from '../../tools/constant';
import {
  HomeScreen, BargingRecapitulationScreen, ProfileScreen,
} from "../../screens";
import { Body } from '../labels/Labels';
import HistoryBargingScreen from '../../screens/historyBarging';
const Tab = createMaterialBottomTabNavigator();


const TabArr = [
  {
    route: NAV_NAME_HOME,
    label: 'Beranda',
    type: iconTools.MaterialCommunityIcons,
    activeIcon: 'home',
    inActiveIcon: 'home-outline',
    component: HomeScreen,
  },
  {
    route: NAV_NAME_HISTORY_BARGING,
    label: 'History',
    type: iconTools.MaterialCommunityIcons,
    activeIcon: 'history',
    inActiveIcon: 'history',
    component: HistoryBargingScreen,
  },
  {
    route: NAV_NAME_PROFILE,
    label: 'Profile',
    type: iconTools.MaterialCommunityIcons,
    activeIcon: 'account',
    inActiveIcon: 'account-outline',
    component: ProfileScreen,
  },
];

const BottomTab = () => {
  return (
    <Tab.Navigator
      shifting={false}
      sceneAnimationEnabled={false}
      activeColor={COLOR_WHITE}
      inactiveColor={COLOR_GRAY_1}
      barStyle={{
        borderRadius: 20,
        backgroundColor: COLOR_PRIMARY,
        borderTopWidth: 1,
        marginBottom: iPad ? 0 : ios ? -10 : 1,
        paddingHorizontal: 6,
        marginHorizontal: 5,
        paddingVertical: 6,
        paddingBottom: 10,
        borderColor: COLOR_TRANSPARENT_DARK,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      screenOptions={{
        headerShown: false,
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            style={{ flex: 1 }}
            options={{
              tabBarIcon: ({ color, focused }) => {
                return (
                  <item.type name={focused ? item.activeIcon : item.inActiveIcon} size={28} color={color} />
                )
              },
              tabBarLabel: <Text style={{ fontFamily: "Poppins-Regular" }}>{item.label}</Text>,
              tabBarIconStyle: { width: 50 }
            }}
          />
        )
      })}
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({

})

export default BottomTab