import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { registerPushNotification } from '../helpers/PushNotification';
import { verifyUser } from '../helpers/verify';

let json = null;
function Home({ navigation }) {
  const [user, setUser] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState('');

  // useEffect(() => {
  //   const test = async () => {
  //     const token = await registerPushNotification();
  //     setExpoPushToken(token);
  //   };
  //   test();
  // }, []);

  // useEffect(() => {
  //   verifyUser(expoPushToken).then((data) => console.log('data.....', data));
  // }, [expoPushToken]);

  useEffect(() => {
    const getUser = async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      json = JSON.parse(value);
      setUser(json);
      goJoin();
    };
    getUser();
  }, []);

  const goJoin = () => {
    if (json) {
      if (!json.RealEstateId) {
        navigation.replace('PickLocation');
      } else if (json.status === 'Inactive') {
        navigation.replace('Waiting');
      } else {
        navigation.replace('GetStarted');
      }
    } else {
      navigation.navigate('GetStarted');
    }
  };
  return (
    <View style={styles.container}>
      <Text>Iki halaman Home Cyok</Text>
      <Button title="JOIN US PAGE" onPress={goJoin}></Button>
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

export default Home;
