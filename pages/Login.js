import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Ubuntu_300Light, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Fontisto, Feather } from '@expo/vector-icons';
import errorHandler from '../helpers/errorHandler';
import { axios } from '../helpers/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import callServer from '../helpers/callServer';
import { useDispatch } from 'react-redux';

  const defaultVal = {
    email: '',
    password: '',
  };

function Login({ navigation }) {
  const [payload, setPayload] = useState(defaultVal);
  const [errMessage, setErrMessage] = useState('');

  let [loaded] = useFonts({
    Ubuntu_300Light,
    Montserrat_600SemiBold,
    Ubuntu_500Medium,
  });

  const dispatch = useDispatch();

  const toJoin = () => {
    navigation.replace('JoinUs');
  }

  const handleInput = (text, name) => {
    const value = {
      ...payload,
      [name]: text,
    };
    setPayload(value);
  };

  const prosesLogin = async () => {
    if (payload.email && payload.password) {
      try {
        const { data } = await axios({
          url: 'users/login-client',
          method: 'post',
          data: payload,
        });
        console.log('UserLogedIn', data);
        if (data.id) {

          const newName = data.fullname.split('#');
          data.fullname = newName[0];

          const option = {
            url: 'users',
            stage: 'getRealEstates',
            method: 'get',
            body: null,
            headers: true, // true
            type: 'SET_USERS',
          };
          // console.log(data, 'data login ..........');
          dispatch(callServer(option));
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem('userlogedin', jsonValue);
        }

        if (!data.RealEstateId) {
          navigation.replace('PickLocation');
        } else if (data.status === 'Inactive') {
          navigation.replace('Waiting');
        } else {
          navigation.replace('Discover');
        }
        console.log('Welcome,' + data.fullname);
      } catch (error) {
        const msg = errorHandler(error);
        console.log(msg);
        setErrMessage(msg)
      }
    } else {
      console.log('All field required!')
    }
  };

  if (!loaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Image style={styles.homeLogo} source={require('../assets/i-homelogo.png')} />
        <Text style={styles.title}>Login</Text>
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
            onChangeText={(text) => handleInput(text, 'password')}
            style={styles.Textinput}
            placeholder="Password"
            placeholderTextColor="#FFF"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.hr} />
        {errMessage ?
          <Text style={styles.errortext}>{errMessage}</Text> : null
        }

        <TouchableOpacity onPress={() => prosesLogin()} style={styles.btn}>
          <Text style={styles.btn_Text}> SUBMIT </Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footer_text}>Don't have an account?</Text>
          <Text style={styles.footer_login} onPress={toJoin}>
            JOIN US
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
  footer: {
    marginTop: 25,
    flexDirection: 'row',
  },
  footer_text: {
    fontFamily: 'Ubuntu_300Light',
    color: 'white',
    fontSize: 14,
  },
  errortext: {
    position: "relative",
    fontFamily: 'Ubuntu_300Light',
    color: 'white',
    fontSize: 14,
    color: 'red',
  },
  footer_login: {
    fontFamily: 'Ubuntu_500Medium',
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
  },
});

export default Login;
