import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Ubuntu_300Light, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { FontAwesome, Fontisto, Feather, Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import callServer from '../helpers/callServer';
import errorHandler from '../helpers/errorHandler';
const defaultVal = {
  fullname: '',
  email: '',
  password: '',
  address: '',
}
function JoinUs({ navigation }) {
  const [payload, setPayload] = useState(defaultVal);
  const dispatch = useDispatch();
  const message = null;
  const { user, loading, error, stage } = useSelector((state) => state.reducerUser);

  const [loaded] = useFonts({
    Ubuntu_300Light,
    Montserrat_600SemiBold,
    Ubuntu_500Medium,
  });

  if (stage === 'joinus') {
    if (error) {
      message = errorHandler(error);
      console.log(message);
    } else if (user.fullname) {
      toLogin();
    }
  }
  console.log(user, loading);
  const handleInput = (text, name) => {
    const value = {
      ...payload,
      [name]: text,
    };
    setPayload(value);
  };

  const toLogin = () => {
    navigation.navigate('Login');
  };

  const prosesJoin = () => {
    if (payload.fullname && payload.email && payload.password && payload.address) {
      const option = {
        url: 'users/register-warga',
        method: 'post',
        body: payload,
        headers: false,
        type: 'SET_USER',
        stage: 'joinus',
      };
      dispatch(callServer(option));
    } else {
      console.log('All field required!');;
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
