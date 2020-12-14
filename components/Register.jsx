import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, ActivityIndicatorComponent } from 'react-native';
import TextBox from 'react-native-password-eye';
import { widthPercentageToDP as wdt, heightPercentageToDP as hgt } from 'react-native-responsive-screen'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store'

export default function Register (props) {
  const { loading, error } = useSelector(s => s)
  const [fullname, setFullname] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleFullname = (val) => setFullname(val)
  const handleAddress = (val) => setAddress(val)
  const handleEmail = (val) => setEmail(val)
  const handlePassword = (val) => setPassword(val)
  const handleRegister = _=> {
    console.log(fullname, address, email, password);
    dispatch(register({ fullname, address, email, password }))
  }

  useEffect(_=> {}, [error])
  console.log(error);

  if (loading) return <ActivityIndicator size='large' color='purple' style={{ flex: 1, justifyContent: "center", alignItems: "center" }} ></ActivityIndicator>

  return (
    <View style={styles.form}>
      <View style={styles.box}>
        {error && (<Text>{error} </Text>)}
        <Text>Full Name</Text>
        <TextInput style={styles.input} onChangeText={handleFullname}></TextInput>
        <Text>Address</Text>
        <TextInput style={styles.input} onChangeText={handleAddress}></TextInput>
        <Text>E-Mail</Text>
        <TextInput style={styles.input} onChangeText={handleEmail} ></TextInput>
        <Text>Password</Text>
        <TextBox onChangeText={handlePassword} containerStyles={[styles.input]} secureTextEntry={true} />
        <Button title='Register' onPress={handleRegister}/>
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