import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../helpers/Axios';
import callServer from '../helpers/callServer';
import callServerV2 from '../helpers/callServer.v2';
import errorHandler from '../helpers/errorHandler';
import { registerPushNotification } from '../helpers/PushNotification';
import { getUserLogedIn, setUserLogedIn } from '../helpers/storange';
import { actionRemoveStageError, actionRemoveUser } from '../store/actions/action';
// import { verifyUser } from '../helpers/verify';

let json = null;
export default function Home({ navigation }) {
  const [userLogedIn, setUserLogedIn] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      console.log('-----UseEffect Pertama')
      const userLogedIn = await getUserLogedIn();
      setUserLogedIn(userLogedIn);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log('userLogedIn', userLogedIn);
      if (userLogedIn !== null) {
        console.log('-----UseEffect UserLogedIn', userLogedIn.hasOwnProperty('id'));
        if (userLogedIn.hasOwnProperty('id')) {
          dispatch(
            callServerV2({
              url: 'users/verify/' + userLogedIn.id,
              stage: 'verifyUser',
              method: 'PUT',
              body: {
                expoPushToken: expoPushToken,
              },
              headers: {
                access_token: userLogedIn.access_token,
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
  }, [userLogedIn])

  const { loading, user, users, error, stage } = useSelector((state) => state.reducerUser);

  useEffect(() => {
    (async () => {
      if (user) {
        console.log('-----UseEffect User');
        // callServerV2({
        //   url: 'users',
        //   stage: 'getAllUser',
        //   method: 'get',
        //   headers: {
        //     access_token: userLogedIn.access_token,
        //   },
        //   type: 'SET_USERS',
        // });
        // const newVal = { ...userLogedIn };
        // for (const key in user) {
        //   if (user.hasOwnProperty(key)) {
        //     newVal[key] = user[key];
        //   }
        // }
        const isSaved = await setUserLogedIn(newVal);
        console.log(isSaved, newVal);
      }
    })();
  }, [user])

  useEffect(() => {
    (async () => {
      console.log('-----UseEffect Users');

    })();
  }, [users])

  if (loading) return <AppLoading />;
  if (error) return (
    <View style={styles.container}>
      <Text>Error..... {JSON.stringify(error)}</Text>
    </View>
  );

  // useEffect(() => {}, []);
  console.log('stage', stage, 'error', error, 'loading', loading);
  // if (error) {
  //   console.error(errorHandler(error));
  // }
  // if (stage === 'verifyUser') {
  //   console.log('stage', stage, 'error', error);
    
  // } else if (stage === 'getAllUser') {
  //   console.log('User.....', user);
  //   // dispatch(actionRemoveStageError());
  // }

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
      <Text>Loading..... { JSON.stringify(users) }</Text>
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
