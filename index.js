import React from 'react';
import {AppRegistry, LogBox} from 'react-native';
import {name as appName} from './app.json';
import App from './app/app';

LogBox.ignoreAllLogs();
const RN_Boilerplate = () => {
  return <App />;
};

AppRegistry.registerComponent(appName, () => RN_Boilerplate);
