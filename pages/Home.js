import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import callServerV2 from '../helpers/callServer.v2';
import errorHandler from '../helpers/errorHandler';
import { registerPushNotification } from '../helpers/PushNotification';
import { getUserLogedIn, setUserLogedIn } from '../helpers/storange';

export default function Home({ navigation }) {
  const [userLogin, setUserLogin] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const userLogedIn = await getUserLogedIn();
      setUserLogin(userLogedIn);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (userLogin !== null) {
        console.log('-----UseEffect userLogin', userLogin);
        if (userLogin.hasOwnProperty('access_token')) {
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
          goJoin();
          console.log('Session Expired');
        }
      }
    })();
  }, [userLogin]);

  const { loading, user, users, stage, error } = useSelector((state) => state.reducerUser);

  useEffect(() => {
    (async () => {
      if (user && userLogin) {
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
        );
        const newVal = { ...userLogin };
        for (const key in user) {
          if (user.hasOwnProperty(key)) {
            if (key === 'status') {
              if (user[key] === 'Active') {
                continue;
              }
            }
            console.log(key, user[key]);
            newVal[key] = user[key];
          }
        }
        await setUserLogedIn(newVal);
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (users.length > 0 && stage === 'getAllUser') {
        goJoin();
      }
    })();
  }, [users]);

  const goJoin = () => {
    navigation.replace('GetStarted');
  };

  if (Platform.OS === 'ios') {
    // if (loading) return <SplashScree
  }

  if (loading) return <Loading />;

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{errorHandler(error)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/splashh.jpg')} style={styles.image}>
      </ImageBackground>
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
  image: {
    flex: 1,
    width: '100%'
  },
});
