import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import AppNavigator from './app/navigators';
import store from './app/redux';

LogBox.ignoreAllLogs();
const RN_Boilerplate = ({isHeadless}) => {
  if (isHeadless) {
    return null;
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RN_Boilerplate);
