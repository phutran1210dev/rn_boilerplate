import {Text, View} from 'react-native';
import {screens} from '@constants';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {Notification, Profile} from '@screens';
import React from 'react';
import {TabBottom} from '../TabBottom';

export type AppStackDrawerParamList = {
  navigate: any;
  openDrawer(): unknown;
  [screens.TabBarBottom]: undefined;
  [screens.ProfileScreen]: undefined;
  [screens.Notification]: undefined;
};

const Drawer = createDrawerNavigator<AppStackDrawerParamList>();

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{flex: 1}}>
        <Text>Custom Header</Text>
        <DrawerItem
          label="Profile"
          onPress={() => props.navigation.navigate(screens.ProfileScreen)}
        />
        <DrawerItem
          label="Notification"
          onPress={() => props.navigation.navigate(screens.Notification)}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName={screens.TabBarBottom}
      backBehavior="history"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name={screens.TabBarBottom} component={TabBottom} />
      <Drawer.Screen name={screens.ProfileScreen} component={Profile} />
      <Drawer.Screen name={screens.Notification} component={Notification} />
    </Drawer.Navigator>
  );
};

export {AppDrawer};
