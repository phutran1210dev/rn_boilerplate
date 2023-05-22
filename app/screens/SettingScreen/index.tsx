import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const SettinScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
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
