import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { axios } from '../helpers/Axios';
import callServer from '../helpers/callServer';
import { registerPushNotification } from '../helpers/PushNotification';
// import { verifyUser } from '../helpers/verify';

let json = null;
export default function Home({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const preload = async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      // const value = await AsyncStorage.removeItem('userlogedin');
      json = JSON.parse(value);
      if (value) {
        const token = await registerPushNotification();
        const option = {
          url: 'users',
          stage: 'getRealEstates',
          method: 'get',
          body: null,
          headers: true, // true
          type: 'SET_USERS',
        };
        dispatch(callServer(option));
        await verifyUser(token);
        setExpoPushToken(token);
      }
      goJoin(json);
    };
    preload();
  }, []);

  const verifyUser = async (expoPushToken) => {
    try {
      const value = await AsyncStorage.getItem('userlogedin');
      const json = JSON.parse(value);

      console.log(json, 'json');
      if (value) {
        const { data } = await axios({
          url: 'users/verify/' + json.id,
          method: 'PUT',
          data: {
            expoPushToken: expoPushToken,
          },
          headers: {
            access_token: json.access_token,
          },
        });
        for (const key in data.user) {
          if (data.user.hasOwnProperty(key)) {
            if (key !== 'status') {
              json[key] = data.user[key];
            }
          }
        }
        json.expoPushToken = expoPushToken;
        await AsyncStorage.setItem('userlogedin', JSON.stringify(json));
      }
    } catch (error) {
      await AsyncStorage.removeItem('userlogedin');
      navigation.replace('GetStarted');
    }
  };

  const goJoin = (user) => {
    if (json) {
      if (!json.RealEstateId) {
        navigation.replace('PickLocation');
      } else if (json.status === 'Inactive') {
        navigation.replace('Waiting');
      } else {
        navigation.replace('GetStarted');
      }
    } else {
      navigation.replace('GetStarted');
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
