import {Text} from 'react-native';
import {screens} from '@constants';
import {AppStackParamList} from '@navigators';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeScreen, SettinScreen} from '@screens';
import {Responsive} from '@utils';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type MainBottomTabParamList = {
  [screens.DrawerLeft]: undefined;
  [screens.HomeScreen]: undefined;
  [screens.SettingScreen]: undefined;
};

export type MainBottomTabNavigationProp<
  RouteName extends keyof MainBottomTabParamList,
> = CompositeNavigationProp<
  BottomTabNavigationProp<MainBottomTabParamList, RouteName>,
  NativeStackNavigationProp<AppStackParamList>
>;

export type MainBottomTabNavigations = {
  [RouteName in keyof MainBottomTabParamList]: MainBottomTabNavigationProp<RouteName>;
};

export type MainBottomTabRoutes = {
  [RouteName in keyof MainBottomTabParamList]: RouteProp<
    MainBottomTabParamList,
    RouteName
  >;
};

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

export const TabBottom = ({}: any) => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName={screens.HomeScreen}
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            height:
              insets.bottom > 0 ? Responsive.height(80) : Responsive.height(70),
          },
        ],
      }}>
      <Tab.Screen
        name={screens.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarLabel: screens.HomeScreen,
          tabBarIcon: () => <Text>Home</Text>,
        }}
      />
      <Tab.Screen
        name={screens.SettingScreen}
        component={SettinScreen}
        options={{
          tabBarLabel: screens.HomeScreen,
          tabBarIcon: () => <Text>Setting</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
