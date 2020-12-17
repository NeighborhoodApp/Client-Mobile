import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Montserrat_600SemiBold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Notification

function GetStarted({ navigation }) {
  let [loaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_500Medium,
  });

  const [expoPushToken, setExpoPushToken] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getStorange = async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      const json = JSON.parse(value);
      setUser(json);
    };
    getStorange();
  }, []);

  function goJoin() {
    if (user) {
      navigation.replace('Discover');
    } else {
      navigation.replace('Login');
    }
  }

  if (!loaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Image style={styles.homeLogo} source={require('../assets/i-homelogo.png')} />
        <Text style={styles.title}>Love neighbour{'\n'}As yourself.</Text>
        <Text style={styles.akronim}>A good neighbour increases {'\n'}the value of your property .</Text>
        <Image style={styles.homeImage} source={require('../assets/home-image.png')} />
        <TouchableOpacity style={styles.btnStart} onPress={goJoin}>
          <Image style={styles.bgButton} source={require('../assets/btn_started.png')} />
          <View>
            <Text style={styles.getStarted}> Get Started </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161C2B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeLogo: {
    width: 200,
    height: 35,
  },
  homeImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  btnStart: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  bgButton: {
    width: 158,
    height: 61,
  },
  title: {
    marginTop: 35,
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 37,
    color: 'white',
    textAlign: 'center',
  },
  akronim: {
    marginTop: 25,
    marginBottom: 15,
    fontFamily: 'Montserrat_500Medium',
    fontSize: 17,
    color: 'white',
  },
  getStarted: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 15,
    color: '#161C2B',
    position: 'absolute',
    bottom: 18,
    right: 20,
  },
});

export default GetStarted;
