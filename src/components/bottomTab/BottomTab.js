import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { iconTools } from '../../tools/helper';
import {
  COLOR_DISABLED, COLOR_PRIMARY, COLOR_WHITE,
  NAV_NAME_HISTORY,
  NAV_NAME_HOME,
  NAV_NAME_PROFILE,
} from '../../tools/constant';
import {
  HomeScreen, HistoryScreen, ProfileScreen,
} from "../../screens";
const Tab = createMaterialBottomTabNavigator();


const TabArr = [
  {
    route: NAV_NAME_HOME,
    label: 'Home',
    type: iconTools.MaterialCommunityIcons,
    activeIcon: 'home',
    inActiveIcon: 'home-outline',
    component: HomeScreen,
  },
  {
    route: NAV_NAME_HISTORY,
    label: 'History',
    type: iconTools.MaterialCommunityIcons,
    activeIcon: 'history',
    inActiveIcon: 'history',
    component: HistoryScreen,
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
      activeColor={COLOR_PRIMARY}
      inactiveColor={COLOR_DISABLED}
      barStyle={{ backgroundColor: COLOR_WHITE, borderTopWidth: 1, borderColor: COLOR_DISABLED,  }}
      screenOptions={{
        headerShown: false,
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
            options={{
              tabBarLabel: <Text style={styles.tabBarLabel}>{item.label}</Text>,
              tabBarIcon: ({ color, focused }) => {
                return (
                  <item.type name={focused ? item.activeIcon : item.inActiveIcon} size={24} color={color} />
                )
              }
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