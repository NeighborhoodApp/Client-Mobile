import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { registerPushNotification } from '../helpers/PushNotification';
import { verifyUser } from '../helpers/verify';

let json = null;
export default function Home({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    const preload = async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      json = JSON.parse(value);
      if (value) {
        const token = await registerPushNotification();
        await verifyUser(token);
        setExpoPushToken(token);
      }
      goJoin(json);
    };
    preload();
  }, []);

  console.log('expooooo', expoPushToken);

  const goJoin = (user) => {
    if (json) {
      if (!json.RealEstateId) {
        navigation.replace('PickLocation');
      } else if (json.status === 'Inactive') {
        navigation.replace('Waiting');
      } else {
        navigation.replace('Discover');
      }
    } else {
      navigation.navigate('GetStarted');
    }
  };
  return (
    <View style={styles.container}>
      <Text>Loading.....</Text>
      {/* <Button title="JOIN US PAGE" onPress={goJoin}></Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
