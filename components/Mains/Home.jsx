import React from 'react'
import { Button, Text, View } from 'react-native'

export default function Home (props) {

  const toRegister = () => props.navigation.navigate('Register')
  // console.log(props);

  return (
    <View>
      <Button title='Go Register' onPress={toRegister}/>
    </View>
  )
}