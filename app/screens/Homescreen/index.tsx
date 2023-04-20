import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {loadString, saveString} from '../../utils';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={{
          backgroundColor: 'red',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
        }}
        onPress={async () => {
          try {
            await saveString('token', 'Accesstoken');
            const token = await loadString('token');
            console.log('🚀 ~ store:', token);
          } catch (error) {
            console.log('eror: ', error);
          }
        }}>
        <Text>Click me</Text>
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
