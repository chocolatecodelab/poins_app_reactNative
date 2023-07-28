import React from 'react'
import { StyleSheet } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { iconTools, ios, iPad } from '../../tools/helper';
import {
  COLOR_DISABLED, COLOR_PRIMARY, COLOR_TRANSPARENT_DARK, COLOR_WHITE,
  NAV_NAME_BARGING_RECAPITULATION,
  NAV_NAME_HOME,
  NAV_NAME_PROFILE,
} from '../../tools/constant';
import {
  HomeScreen, HistoryScreen, ProfileScreen,
} from "../../screens";
import { Body } from '../labels/Labels';
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
  // {
  //   route: NAV_NAME_BARGING_RECAPITULATION,
  //   label: 'History',
  //   type: iconTools.MaterialCommunityIcons,
  //   activeIcon: 'history',
  //   inActiveIcon: 'history',
  //   component: HistoryScreen,
  // },
  // {
  //   route: NAV_NAME_PROFILE,
  //   label: 'Profile',
  //   type: iconTools.MaterialCommunityIcons,
  //   activeIcon: 'account',
  //   inActiveIcon: 'account-outline',
  //   component: ProfileScreen,
  // },
];

const BottomTab = () => {
  return (
    <Tab.Navigator
      shifting={false}
      sceneAnimationEnabled={false}
      activeColor={COLOR_PRIMARY}
      inactiveColor={COLOR_DISABLED}
      barStyle={{
        backgroundColor: COLOR_WHITE,
        borderTopWidth: 1,
        marginBottom: iPad ? 0 : ios ? -10 : 0,
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
              tabBarLabel: <Body style={{ color: COLOR_PRIMARY }}>{item.label}</Body>,
              tabBarIcon: ({ color, focused }) => {
                return (
                  <item.type name={focused ? item.activeIcon : item.inActiveIcon} size={28} color={color} />
                )
              },
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