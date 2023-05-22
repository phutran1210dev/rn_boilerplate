import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {responsive} from '@utils';
import React from 'react';
import {Text, TextStyle, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeScreen} from '../../screens';
import {screens} from '@constants';
import {AppStackScreenProps, AppStackParamList} from '@navigators';

export type TabParamList = {
  [screens.homeScreen]: undefined;
};

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>;

const Tab = createBottomTabNavigator<TabParamList>();

export function TabBarBottom({tabarStyle}: any) {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName={screens.homeScreen}
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          tabBar,
          {
            height:
              insets.bottom > 0 ? responsive.height(80) : responsive.height(70),
          },
        ],
        tabBarActiveTintColor: tabarStyle.iconActive,
        tabBarInactiveTintColor: tabarStyle.iconInActive,
        tabBarLabelStyle: tabBarLabel,
        tabBarItemStyle: tabBarItem,
        tabBarActiveBackgroundColor: tabarStyle.activeBackgroundColor,
        tabBarInactiveBackgroundColor: tabarStyle.inactiveBackgroundColor,
      }}>
      <Tab.Screen
        name={screens.homeScreen}
        component={HomeScreen}
        options={{
          tabBarLabel: screens.homeScreen,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            // <Icon
            //   icon="home"
            //   color={focused ? tabarStyle.iconActive : tabarStyle.iconInActive}
            //   size={responsive.height(32)}
            // />
            <Text style={{color: focused ? '#000' : '#4f4f4f'}}>Home</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const tabBar: ViewStyle = {
  paddingBottom: 0,
  borderTopWidth: 0,
};

const tabBarItem: ViewStyle = {
  paddingTop: responsive.height(10),
};

const tabBarLabel: TextStyle = {
  fontSize: responsive.height(12),
  marginVertical: responsive.height(5),
  flex: 1,
};
