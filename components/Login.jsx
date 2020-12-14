import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wdt, heightPercentageToDP as hgt } from 'react-native-responsive-screen';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextBox from 'react-native-password-eye';
import { login } from '../store';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Login (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmail = val => setEmail(val)
  const handlePassword = val => setPassword(val)
  const handleSubmit = async () => {
    console.log(email, password);
    try {
      await AsyncStorage.setItem('Profile', 'mencoba')
      props.navigation.navigate('ChooseComplex')
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    AsyncStorage.getItem('Profile')
      .then(data => {
        if (data) props.navigation.navigate('ChooseComplex')
      })
      .catch(console.log)
  }, [])

  const toRegister = _=> props.navigation.navigate('Register')

  return (
    <View style={styles.form}>
      <View style={styles.box}>
        <Text>Email</Text>
        <TextInput style={styles.input} onChangeText={handleEmail} />
        <Text>Password</Text>
        <TextBox onChangeText={handlePassword} containerStyles={[styles.input]} secureTextEntry={true} />
        <Button title='Login' onPress={handleSubmit} />
        <View>
          <TouchableOpacity onPress={toRegister}>
            <Text>Not registered??</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input:{
    borderWidth: wdt('0.3%'),
    borderColor: 'blue'
  },
  box:{
    backgroundColor: 'red',
    borderRadius: wdt('10%'),
    width: wdt('80%'),
    padding: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  }
})