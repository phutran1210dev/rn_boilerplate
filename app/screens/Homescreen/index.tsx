import { Text } from '@components';
import { useNavigation } from '@react-navigation/native';
import { AppStackDrawerParamList } from 'app/navigators/Drawer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export const homeScreen = () => {
  const navigation = useNavigation<AppStackDrawerParamList>();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text i18nKey='login.sign_in' />
      <TouchableHighlight onPress={() => navigation.openDrawer()}>
        <Text txtContent="Click Me" />
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
