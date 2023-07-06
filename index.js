import {AppRegistry, LogBox} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import {AppNavigator} from '@navigators';
import store from '@store';

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
