import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator } from 'react-native';
import TextBox from 'react-native-password-eye';
import {Picker} from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRealEstate } from '../store';
import { widthPercentageToDP as wdt, heightPercentageToDP as hgt } from 'react-native-responsive-screen'

export default function Register (props) {
  const { realEstate, kompleks, loading, error } = useSelector(s => s)
  const [fullname, setFullname] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(_=> {
    dispatch(fetchRealEstate())
  }, [loading])

  const handleFullname = (val) => setFullname(val)
  const handleAddress = (val) => setAddress(val)
  const handleEmail = (val) => setEmail(val)
  const handlePassword = (val) => setPassword(val)

  console.log(email, password, fullname, address);

  if (loading) <ActivityIndicator size="large" />

  return (
    <View style={styles.form}>
      <View style={styles.box}>
        <Text>Full Name</Text>
        <TextInput style={styles.input} onChangeText={handleFullname}></TextInput>
        <Text>Address</Text>
        <TextInput style={styles.input} onChangeText={handleAddress}></TextInput>
        <Text>E-Mail</Text>
        <TextInput style={styles.input} onChangeText={handleEmail} ></TextInput>
        <Text>Password</Text>
        <TextBox onChangeText={handlePassword} containerStyles={[styles.input]} secureTextEntry={true} />
        <Button title='Register' />
        <Picker
          selectedValue={'java'}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) => { console.log(itemValue) }}>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
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