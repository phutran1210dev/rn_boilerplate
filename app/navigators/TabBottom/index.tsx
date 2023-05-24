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
import {responsive} from '@utils';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type MainBottomTabParamList = {
  [screens.drawer]: undefined;
  [screens.homeScreen]: undefined;
  [screens.settingScreen]: undefined;
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
      initialRouteName={screens.homeScreen}
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            height:
              insets.bottom > 0 ? responsive.height(80) : responsive.height(70),
          },
        ],
      }}>
      <Tab.Screen
        name={screens.homeScreen}
        component={HomeScreen}
        options={{
          tabBarLabel: screens.homeScreen,
          tabBarIcon: () => <Text>Home</Text>,
        }}
      />
      <Tab.Screen
        name={screens.settingScreen}
        component={SettinScreen}
        options={{
          tabBarLabel: screens.homeScreen,
          tabBarIcon: () => <Text>Setting</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
