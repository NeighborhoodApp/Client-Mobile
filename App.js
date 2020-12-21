import React from 'react';

import { Text, Image, TouchableOpacity, StyleSheet, Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Home,
  GetStarted,
  JoinUs,
  Login,
  Waiting,
  Discover,
  Profile,
  Verification,
  Menu,
  PickLocation,
  Comment,
  Tetonggo,
  CreateEvent,
  EventCalendar,
  CreateFee,
  UpcomingEvent,
  EventDetail,
} from './pages';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './store';
import NotificationPage from './pages/Notification';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          {/* <Stack.Screen name="NotificationPage" component={NotificationPage} options={{ headerShown: true }} /> */}

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Discover',
              headerRight: () => (
                <TouchableOpacity>
                  <Avatar.Image
                    size={40}
                    source={{
                      uri: 'https://i.pinimg.com/474x/73/c3/e7/73c3e7cca66a885c53718d8f3688b02c.jpg',
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
            }}
          />
          <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
          <Stack.Screen name="JoinUs" component={JoinUs} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Waiting" component={Waiting} options={{ headerShown: false }} />
          <Stack.Screen
            name="Discover"
            component={Discover}
            options={{
              headerTitle: () => (
                <View style={styles.discoverRow}>
                  <Text style={styles.title}>Discover</Text>
                  <MaterialCommunityIcons name="moon-full" size={10} color="#2FBBF0" />
                </View>
              ),
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#161C2B',
                height: 100,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                alignSelf: 'center',
                color: '#fff',
              },
            }}
          />
          <Stack.Screen
            name="Comment"
            component={Comment}
            options={{
              headerTitle: () => (
                <View style={styles.discoverRow}>
                  <Text style={styles.title}>Comment</Text>
                  <MaterialCommunityIcons name="moon-full" size={10} color="#2FBBF0" />
                </View>
              ),
              headerStyle: {
                backgroundColor: '#161C2B',
                height: 100,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                alignSelf: 'center',
                color: '#fff',
              },
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerTitle: () => (
                <View style={styles.row}>
                  <Text style={styles.title}>Profile</Text>
                  <MaterialCommunityIcons name="moon-full" size={10} color="#2FBBF0" />
                </View>
              ),
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#161C2B',
                height: 100,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                alignSelf: 'center',
                color: '#fff',
              },
            }}
          />
          <Stack.Screen
            name="CreateEvent"
            component={CreateEvent}
            options={{
              headerTitle: () => (
                <View style={styles.row}>
                  <Text style={styles.title}>Add Event</Text>
                  <MaterialCommunityIcons name="moon-full" size={10} color="#2FBBF0" />
                </View>
              ),
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#161C2B',
                height: 100,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                alignSelf: 'center',
                color: '#fff',
              },
            }}
          />
          <Stack.Screen
            name="CreateFee"
            component={CreateFee}
            options={{
              headerTitle: () => (
                <View style={styles.row}>
                  <Text style={styles.title}>Add Fee</Text>
                  <MaterialCommunityIcons name="moon-full" size={10} color="#2FBBF0" />
                </View>
              ),
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#161C2B',
                height: 100,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                alignSelf: 'center',
                color: '#fff',
              },
            }}
          />
          <Stack.Screen
            name="EventCalendar"
            component={EventCalendar}
            options={{
              headerTitle: () => (
                <View style={styles.row}>
                  <Text style={styles.title}>Event Calendar</Text>
                  <MaterialCommunityIcons name="moon-full" size={10} color="#2FBBF0" />
                </View>
              ),
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#161C2B',
                height: 100,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                alignSelf: 'center',
                color: '#fff',
              },
            }}
          />
          <Stack.Screen name="PickLocation" component={PickLocation} options={{ headerShown: false }} />
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{
              headerTitle: () => (
                <View style={styles.row}>
                  <Image style={styles.logo} source={require('./assets/logo-menu.png')} />
                  <Text style={styles.menuTitle}>Hi, Tetonggo {'\n'}Welcome Back!</Text>
                </View>
              ),
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#161C2B',
                height: 200,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                alignSelf: 'center',
                color: '#fff',
              },
            }}
          />
          <Stack.Screen
            name="Verification"
            component={Verification}
            options={{
              headerTitle: () => (
                <View style={styles.row}>
                  <Text style={styles.title}>Verification</Text>
                  <MaterialCommunityIcons name="moon-full" size={10} color="#2FBBF0" />
                </View>
              ),
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#161C2B',
                height: 100,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                alignSelf: 'center',
                color: '#fff',
              },
            }}
          />
          <Stack.Screen
            name="Tetonggo"
            component={Tetonggo}
            options={{
              headerTitle: () => (
                <View style={styles.discoverRow}>
                  <Text style={styles.title}>Tetonggo</Text>
                  <MaterialCommunityIcons name="moon-full" size={10} color="#2FBBF0" />
                </View>
              ),
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#161C2B',
                height: 100,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                alignSelf: 'center',
                color: '#fff',
              },
            }}
          />
          <Stack.Screen
            name="UpcomingEvent"
            component={UpcomingEvent}
            options={{
              headerTitle: () => (
                <View style={styles.discoverRow}>
                  <Text style={styles.title}>Upcoming Event</Text>
                  <MaterialCommunityIcons name="moon-full" size={10} color="#2FBBF0" />
                </View>
              ),
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#161C2B',
                height: 100,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                alignSelf: 'center',
                color: '#fff',
              },
            }}
          />
          <Stack.Screen
            name="EventDetail"
            component={EventDetail}
            options={{
              headerTitle: () => (
                <View style={styles.row}>
                  <Text style={styles.title}>Event Detail</Text>
                  <MaterialCommunityIcons name="moon-full" size={10} color="#2FBBF0" />
                </View>
              ),
              headerLeft: null,
              headerStyle: {
                backgroundColor: '#161C2B',
                height: 100,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                alignSelf: 'center',
                color: '#fff',
              },
            }}
          />
          {/* <Stack.Screen name="NotificationPage" component={NotificationPage} options={{ headerShown: true }} /> */}
        </Stack.Navigator>
      </Provider>
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
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  discoverRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  icon: {
    position: 'absolute',
  },
  logo: {
    width: 126,
    height: 111,
    marginRight: 20,
    left: 0,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 25,
    marginRight: 40,
  },
});
