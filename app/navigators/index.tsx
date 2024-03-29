import Config from '@config';
import React, {ComponentProps, useEffect, useState} from 'react';
import {screens} from '@constants';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  RouteProp,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {LoginScreen, RegisterScreen} from '@screens';
import {navigationRef, saveStringToStorage, useBackButtonHandler} from '@utils';
import '@utils/ignoreWarnings';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {AppDrawer} from './Drawer';
import {I18nextProvider} from 'react-i18next';
import i18n from '@i18n';

export type AppStackParamList = {
  [screens.LoginScreen]: undefined;
  [screens.RegisterScreen]: undefined;
  [screens.TabBarBottom]: undefined;
  [screens.DrawerLeft]: undefined;
  [screens.HomeScreen]: undefined;
  [screens.SettingScreen]: undefined;
};

export type AppStackNavigationProp<RouteName extends keyof AppStackParamList> =
  NativeStackNavigationProp<AppStackParamList, RouteName>;

export type AppNavigations = {
  [RouteName in keyof AppStackParamList]: AppStackNavigationProp<RouteName>;
};

export type AppStackRoutes = {
  [RouteName in keyof AppStackParamList]: RouteProp<
    AppStackParamList,
    RouteName
  >;
};

// Documentation: https://reactnavigation.org/docs/stack-navigator/
export const Stack = createNativeStackNavigator<AppStackParamList>();
const exitRoutes = Config.exitRoutes;

const useAuthNavigator = () => {
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const access_token = await saveStringToStorage(
          'access_token',
          'Secret',
        );
        if (access_token) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error during app bootstrap', error);
      }
    };

    if (isLoading) {
      init();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View style={(styles.AppContainer, styles.BaseCenter)}>
        <Text>Loading....</Text>
      </View>
    );
  }

  if (!false) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={screens.DrawerLeft} component={AppDrawer} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={screens.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={screens.RegisterScreen} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();
  const RootStackScreen = useAuthNavigator();
  useBackButtonHandler(routeName => exitRoutes.includes(routeName));
  return (
    <I18nextProvider i18n={i18n}>
      <GestureHandlerRootView style={styles.AppContainer}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <NavigationContainer
            ref={navigationRef}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            {...props}
            onReady={() => RNBootSplash.hide({fade: true, duration: 1000})}>
            {RootStackScreen}
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </I18nextProvider>
  );
};

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
  },
  BaseCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
