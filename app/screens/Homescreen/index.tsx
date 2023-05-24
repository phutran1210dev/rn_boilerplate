import {useNavigation} from '@react-navigation/native';
import {AppStackDrawerParamList} from 'app/navigators/Drawer';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

export const HomeScreen = () => {
  const navigation = useNavigation<AppStackDrawerParamList>();
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableHighlight onPress={() => navigation.openDrawer()}>
        <Text>Click Me</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
