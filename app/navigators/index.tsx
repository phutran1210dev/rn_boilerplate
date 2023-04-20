import React, {ComponentProps, useEffect, useState} from 'react';
import {StyleSheet, Text, View, useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackScreenProps} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import Config from 'react-native-config';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import '../utils/ignoreWarnings';
import {screens} from '../constants';
import {HomeScreen} from '../screens';
import {LoginScreen, RegisterScreen} from '../screens/Auth';
import {navigationRef, saveString, useBackButtonHandler} from '../utils';

export type RootStackParamList = {
  [screens.loginScreen]: undefined;
  [screens.registerScreen]: undefined;
  [screens.tabBarBottom]: undefined;
  [screens.homeScreen]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer>> {}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<RootStackParamList>();

const exitRoutes = Config.exitRoutes;
const useAuthNavigator = () => {
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const access_token = await saveString('access_token', 'Secret');
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
      bootstrapAsync();
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
        {/* <Stack.Screen name={screens.tabBottom} component={TabBarBottom} /> */}
        <Stack.Screen name={screens.homeScreen} component={HomeScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={screens.loginScreen} component={LoginScreen} />
      <Stack.Screen name={screens.registerScreen} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();
  const RootStackScreen = useAuthNavigator();
  useBackButtonHandler(routeName => exitRoutes.includes(routeName));
  return (
    <GestureHandlerRootView style={styles.AppContainer}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NavigationContainer
          ref={navigationRef}
          theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          {...props}
          onReady={() => RNBootSplash.hide({fade: true, duration: 2000})}>
          {RootStackScreen}
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
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

export default AppNavigator;