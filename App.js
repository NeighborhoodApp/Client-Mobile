import React from 'react';
import { Text, Image, TouchableOpacity, StyleSheet, Button, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Home, GetStarted, JoinUs, Login, Waiting, Discover, Profile } from './pages';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          title: 'Discover',
          headerRight: () => (
            <TouchableOpacity>
            <Avatar.Image
            size={40}
            source={{
              uri:
                'https://i.pinimg.com/474x/73/c3/e7/73c3e7cca66a885c53718d8f3688b02c.jpg',
            }}
          />
          </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#161C2B',
            height: 100,
          },
          headerTitleContainerStyle: {
            paddingStart: 20,
          },
          // headerLeft: null,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="GetStarted" component={GetStarted} options={{headerShown: false}}/>
        <Stack.Screen name="JoinUs" component={JoinUs} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Waiting" component={Waiting} options={{headerShown: false}} />
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="Profile" component={Profile} 
        options={{
          headerTitle: ()=> (<View style={styles.row}><Text style={styles.title}>Profile / Create Fees</Text><MaterialCommunityIcons name="moon-full" size={10} color="#2FBBF0"/></View>),
          headerLeft: null,
          headerStyle: {
            backgroundColor: '#161C2B',
            height: 100,
          },
          headerTintColor: '#fff',
          headerTitleStyle: { 
            alignSelf: 'center',
            color:  '#fff',
            }
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
  },
  profileButton: {
    borderWidth: 1,
    // borderColor: 'rgba(0,0,0,0.2)',
    width: '13%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: '1%',
    margin: '1%',
  },
  profileImage: {
    height: undefined,
    width: undefined,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color:  '#fff',
    marginRight: 10
  },
  icon: {
    position: 'absolute',
  }
});





