import { screens } from '@constants';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { Notification, Profile } from '@screens';
import { Text, View } from 'react-native';
import { TabBottom } from '../TabBottom';

export type AppStackDrawerParamList = {
  openDrawer(): unknown;
  [screens.tabBarBottom]: undefined;
  [screens.profileScreen]: undefined;
  [screens.notification]: undefined;
};

const Drawer = createDrawerNavigator<AppStackDrawerParamList>();

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1 }}>
        <Text>Custom Header</Text>
        <DrawerItem
          label="Profile"
          onPress={() => props.navigation.navigate(screens.profileScreen)}
        />
        <DrawerItem
          label="Notification"
          onPress={() => props.navigation.navigate(screens.notification)}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export const AppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName={screens.tabBarBottom}
      backBehavior="history"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name={screens.tabBarBottom} component={TabBottom} />
      <Drawer.Screen name={screens.profileScreen} component={Profile} />
      <Drawer.Screen name={screens.notification} component={Notification} />
    </Drawer.Navigator>
  );
};
