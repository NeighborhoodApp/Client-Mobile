import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function Home({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      // setUser(JSON.parse(value));

      if (value) {
        navigation.replace('Waiting');
      } else {
        navigation.navigate('GetStarted');
      }
    };
    getUser();
  }, []);

  const goJoin = () => {
    console.log(user)
    if (user) {
      navigation.replace('JoinUs');
    } else {
      navigation.navigate('GetStarted');
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
