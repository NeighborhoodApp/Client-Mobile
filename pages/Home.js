import AppLoading from 'expo-app-loading';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import callServerV2 from '../helpers/callServer.v2';
import { registerPushNotification } from '../helpers/PushNotification';
import { getUserLogedIn, setUserLogedIn } from '../helpers/storange';

export default function Home({ navigation }) {
  const [userLogin, setUserLogin] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      console.log('-----UseEffect Pertama');
      const userLogedIn = await getUserLogedIn();
      setUserLogin(userLogedIn);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (userLogin !== null) {
        // console.log('-----UseEffect userLogin', userLogin.hasOwnProperty('id'));
        if (userLogin.hasOwnProperty('id')) {
          const expoPushToken = await registerPushNotification();
          dispatch(
            callServerV2({
              url: 'users/verify/' + userLogin.id,
              stage: 'verifyUser',
              method: 'PUT',
              body: {
                expoPushToken: expoPushToken,
              },
              headers: {
                access_token: userLogin.access_token,
              },
              type: 'SET_USER',
            }),
          );
        } else {
          navigation.replace('Login');
          console.log('Session Expired');
        }
      }
    })();
  }, [userLogin]);

  const { loading, user, users, error, stage } = useSelector((state) => state.reducerUser);

  useEffect(() => {
    (async () => {
      if (user) {
        // console.log('-----UseEffect User');
        dispatch(
          callServerV2({
            url: 'users',
            stage: 'getAllUser',
            method: 'get',
            headers: {
              access_token: userLogin.access_token,
            },
            type: 'SET_USERS',
          }),
        );;;
        const newVal = { ...userLogin };
        for (const key in user) {
          if (user.hasOwnProperty(key)) {
            newVal[key] = user[key];
          }
        }
        await setUserLogedIn(JSON.stringify(newVal));
      }
    })();
  }, [user]);

  console.log('users', users);

  useEffect(() => {
    (async () => {
      console.log('-----UseEffect Users');
      goJoin(userLogin);
    })();
  }, [users]);

  if (loading) return <AppLoading />;

  if (error)
    return (
      <View style={styles.container}>
        <Text>Error.....</Text>
      </View>
    );

  const goJoin = (user) => {
    if (user) {
      if (!user.RealEstateId) {
        navigation.replace('PickLocation');
      } else if (user.status === 'Inactive') {
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
      <Text>Loading..... {JSON.stringify(users)}</Text>
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
