import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Ubuntu_300Light, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { FontAwesome, Fontisto, Feather, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import errorHandler from '../helpers/errorHandler';
import { axios } from '../helpers/Axios';

const defaultVal = {
  fullname: '',
  email: '',
  password: '',
  address: '',
};

function JoinUs({ navigation }) {
  const [payload, setPayload] = useState(defaultVal);
  const [errMessage, seterrMessage] = useState('');

  const [loaded] = useFonts({
    Ubuntu_300Light,
    Montserrat_600SemiBold,
    Ubuntu_500Medium,
  });

  const toLogin = () => {
    navigation.navigate('Login');
  };

  const handleInput = (text, name) => {
    const value = {
      ...payload,
      [name]: text,
    };
    setPayload(value);
  };

  const prosesJoin = async () => {
    if (payload.fullname && payload.email && payload.password && payload.address) {
      try {
        const { data } = await axios({
          url: 'users/register-warga',
          method: 'post',
          data: payload,
        });
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('userlogedin', jsonValue);
        console.log('Welcome,' + data.fullname);
        navigation.replace('Login');
      } catch (error) {
        const msg = errorHandler(error);
        seterrMessage(msg);
      }
    } else {
      seterrMessage('All field required!');
    }
  };

  if (!loaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Image style={styles.homeLogo} source={require('../assets/i-homelogo.png')} />
        <Text style={styles.title}>JoinUs</Text>
        <View style={styles.input}>
          <FontAwesome name="user" size={20} color="white" style={{ marginLeft: 10 }} />
          <TextInput
            onChangeText={(text) => handleInput(text, 'fullname')}
            style={styles.Textinput}
            placeholder="Full Name"
            placeholderTextColor="#FFF"
          />
        </View>
        <View style={styles.hr} />
        <View style={styles.input}>
          <Fontisto name="email" size={20} color="white" style={{ marginLeft: 5 }} />
          <TextInput
            onChangeText={(text) => handleInput(text, 'email')}
            style={styles.Textinput}
            placeholder="Email"
            placeholderTextColor="#FFF"
          />
        </View>
        <View style={styles.hr} />
        <View style={styles.input}>
          <Feather name="lock" size={20} color="white" style={{ marginLeft: 5 }} />
          <TextInput
            name="password"
            onChangeText={(text) => handleInput(text, 'password')}
            style={styles.Textinput}
            placeholder="Password"
            placeholderTextColor="#FFF"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.hr} />
        <View style={styles.input}>
          <Entypo name="location" size={20} color="white" style={{ marginLeft: 6 }} />
          <TextInput
            onChangeText={(text) => handleInput(text, 'address')}
            style={styles.Textinput}
            placeholder="Address"
            placeholderTextColor="#FFF"
          />
        </View>
        <View style={styles.hr} />

        {errMessage ? <Text style={styles.errortext}>{errMessage}</Text> : null}
        <TouchableOpacity onPress={() => prosesJoin()} style={styles.btn}>
          <Text style={styles.btn_Text}> SUBMIT </Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footer_text}>Already have an account?</Text>
          <Text style={styles.footer_login} onPress={toLogin}>
            LOGIN
          </Text>
        </View>
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
  title: {
    marginTop: 50,
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 37,
    color: 'white',
    textAlign: 'left',
    alignSelf: 'stretch',
    marginLeft: 35,
    marginBottom: 40,
  },
  input: {
    marginTop: 10,
    textAlign: 'left',
    alignSelf: 'stretch',
    marginLeft: 60,
    flexDirection: 'row',
  },
  Textinput: {
    height: 24,
    fontFamily: 'Ubuntu_300Light',
    color: 'white',
    marginLeft: 15,
    fontSize: 15,
  },
  hr: {
    borderBottomColor: '#A2A2A2',
    borderBottomWidth: 0.6,
    width: '70%',
    marginTop: 8,
    marginBottom: 10,
  },
  btn: {
    elevation: 8,
    backgroundColor: '#5CB409',
    borderRadius: 6,
    paddingVertical: 14,
    width: '70%',
    marginTop: 40,
  },
  btn_Text: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  errortext: {
    position: 'relative',
    fontFamily: 'Ubuntu_300Light',
    color: 'white',
    fontSize: 14,
    color: 'red',
  },
  footer: {
    marginTop: 25,
    flexDirection: 'row',
  },
  footer_text: {
    fontFamily: 'Ubuntu_300Light',
    color: 'white',
    fontSize: 14,
  },
  footer_login: {
    fontFamily: 'Ubuntu_500Medium',
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
  },
});

export default JoinUs;
