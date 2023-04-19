import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';

const App: FC = () => {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'blue'}}>RN Boilerplate</Text>
      </View>
    </NavigationContainer>
  );
};

export default App;
