import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Home, GetStarted, JoinUs, Login, Waiting} from './pages'
import { Provider } from 'react-redux';
import store from './store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="GetStarted" component={GetStarted} options={{  headerShown: false  }}  />
          <Stack.Screen name="JoinUs" component={JoinUs} options={{  headerShown: false  }} />
          <Stack.Screen name="Login" component={Login} options={{  headerShown: false  }} />
          <Stack.Screen name="Waiting" component={Waiting} options={{  headerShown: false  }} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}



