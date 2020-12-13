import React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Calendar from './Main/Calendar';
import Home from './Main/Home';

export default function Main () {

  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={Home} /> 
      <Drawer.Screen name='Kalender' component={Calendar} /> 
    </Drawer.Navigator>
  )
}