import React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Calendar from './Mains/Calendar';
import Home from './Mains/Home';
import Timeline from './Mains/Timeline';

export default function Main (props) {

  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={Home} /> 
      <Drawer.Screen name='Kalender' component={Calendar} /> 
      <Drawer.Screen name='Timeline' component={Timeline} /> 
    </Drawer.Navigator>
  )
}