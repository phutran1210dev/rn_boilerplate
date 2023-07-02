import { Button, Toast } from '@ant-design/react-native';
import { Text } from '@components';
import { useNavigation } from '@react-navigation/native';
import { AppStackDrawerParamList } from 'app/navigators/Drawer';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import { TouchableHighlight } from 'react-native-gesture-handler';

export const HomeScreen = () => {
  const navigation = useNavigation<AppStackDrawerParamList>();
  const { t } = useTranslation();

  useEffect(() => {
    const loginRequest = async () => {
      try {
        const response = await fetch(Config.API_URL + '/api/v1/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: '123123@gmail.com',
            password: '123123123',
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("🚀 ~ file: index.tsx:32 ~ loginRequest ~ data:", data)
          // dispatch(login(data)); // Dispatch the login action with the response data
        } else {
          const error = await response.json();
          throw new Error(error.message || 'Login failed');
        }
      } catch (error) {
        console.log('Login error:', error);
      }
    };

    loginRequest();
  }, []);
  return (
    <View style={styles.container}>
      <Text i18nKey='login.sign_in' />
      <TouchableHighlight onPress={() => navigation.openDrawer()}>
        <Text txtContent="Click Me" />
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
