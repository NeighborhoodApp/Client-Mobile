import React from 'react';
import { Text } from 'react-native';
import Calendar from './Mains/Calendar';
import Profile from './Mains/Profile';
import Home from './Mains/Home';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

export default function Main (props) {

  return (
    <Tab.Navigator inactiveColor='green'>
      <Tab.Screen name='Home' component={Home} /> 
      <Tab.Screen name='Kalender' component={Calendar} /> 
      <Tab.Screen name='Profile' component={Profile} /> 
    </Tab.Navigator>
  )
}