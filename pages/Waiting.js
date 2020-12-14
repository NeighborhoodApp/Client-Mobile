import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts, Ubuntu_300Light, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultValue = {
  address: '',
  email: '',
  fullname: '',
  id: '',
};
function Waiting() {
  let [loaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    Montserrat_500Medium,
  });

  const [user, setUser] = useState(defaultValue);

  useEffect(() => {
    const getUser = async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      setUser(JSON.parse(value));
    };
    getUser();
  }, []);

  console.log(user);

  return (
    <View style={styles.container}>
      <Image style={styles.waiting} source={require('../assets/waiting.png')} />
      <View style={styles.box}>
        <Text style={styles.firstLine}> Hi, {user.fullname}! </Text>
        <Text style={styles.secondLine}>
          {' '}
          Please wait... {'\n'} until your account {'\n'} is verified.
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.firstLine}> Next! </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waiting: {
    width: 700,
    height: 400,
    alignSelf: 'flex-start',
    marginLeft: 50,
    marginTop: 50,
  },
  box: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -20,
    backgroundColor: '#161C2B',
    paddingVertical: '20%',
    width: '100%',
    height: '35%',
  },
  footer: {
    // marginTop:-50,
    backgroundColor: '#161C2B',
    position: 'absolute',
    alignSelf: 'flex-end',
    position: 'absolute',
    height: '5%',
    width: '100%',
    bottom: 0,
  },
  firstLine: {
    fontFamily: 'Ubuntu_700Bold',
    paddingTop: 6,
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  secondLine: {
    marginTop: 30,
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default Waiting;
