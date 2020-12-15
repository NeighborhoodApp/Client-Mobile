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
      const json = JSON.parse(value);
      setUser(json);
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
    getUser();
  }, []);

  const goJoin = () => {
    console.log(user);
    if (user) {
      navigation.replace('JoinUs');
    } else {
      navigation.navigate('PickLocation');
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
