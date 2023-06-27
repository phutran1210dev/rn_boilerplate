import { Button, Toast } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { AppStackDrawerParamList } from 'app/navigators/Drawer';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import { TouchableHighlight } from 'react-native-gesture-handler';

export const HomeScreen = () => {
  const navigation = useNavigation<AppStackDrawerParamList>();
  const { t } = useTranslation();
  console.log('<===== ENV =====>', Config.API_URL)
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableHighlight onPress={() => navigation.openDrawer()}>
        <Text>Click Me</Text>
      </TouchableHighlight>
      <Button onPress={() => Toast.info(t('login.sign_in'))}>Press me</Button>
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
