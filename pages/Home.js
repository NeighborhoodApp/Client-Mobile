import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import callServer from '../helpers/callServer';

function Home({ navigation }) {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      const json = JSON.parse(value)
      setUser(json);

      if (json) {
        if (!json.RealEstateId) {
          const option = {
            url: 'real-estates',
            stage: 'getRealEstates',
            method: 'get',
            body: null,
            headers: null,
            type: 'SET_REAL_ESTATES',
          };
          dispatch(callServer(option))
          navigation.replace('PickLocation');
        } else {
          navigation.navigate('Waiting')
        }
      } else {
        navigation.navigate('Login');
      }
    };
    getUser();
  }, []);

  const goJoin = () => {
    console.log(user)
    if (user) {
      navigation.replace('JoinUs');
    } else {
      navigation.navigate('PickLocation');
    }
  }
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
