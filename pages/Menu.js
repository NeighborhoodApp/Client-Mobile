import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { MaterialIcons, Fontisto, FontAwesome5, Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { actionRemoveUser } from '../store/actions/action';
import Loading from '../components/Loading';

function Menu({ navigation }) {
  const [loaded] = useFonts({
    Roboto_500Medium,
  });

  const [user, setUser] = useState({ RoleId: 3 });
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('userlogedin');
      const rawData = JSON.parse(user);
      setUser(rawData);
    };
    getUser();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('userlogedin');
    dispatch(actionRemoveUser());
    // navigation.replace('Login');
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Login'
        },
      ],
    });
  };

  if (!loaded) return <Loading />;

  return (
    <View style={styles.box}>
      <Text></Text>
      <View style={styles.container}>
        <Text style={styles.account}>Account</Text>
        <View style={styles.column}>
          <TouchableOpacity style={styles.btn_menu} onPress={() => navigation.navigate('UpcomingEvent')}>
            <MaterialIcons style={styles.icon} name="notifications-active" size={22} color="#2C6FC7" />
            <Text style={styles.menu}> Upcoming Event </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.btn_menu} onPress={() => navigation.navigate('CreateEvent')}>
            <Fontisto style={styles.icon} name="calendar" size={22} color="#2C6FC7" />
            <Text style={styles.menu}> Create Event </Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.btn_menu} onPress={() => navigation.navigate('Tetonggo')}>
            <FontAwesome5 style={styles.icon} name="users" size={18} color="#2C6FC7" />
            <Text style={styles.menu}> Neighbours </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_menu} onPress={() => navigation.navigate('Profile')}>
            <FontAwesome style={{ marginLeft: '8.5%' }} name="user" size={23} color="#2C6FC7" />
            <Text style={styles.menu}>Profile </Text>
          </TouchableOpacity>
          {!user ? null : user.RoleId !== 2 ? null : (
            <>
              <TouchableOpacity style={styles.btn_menu} onPress={() => navigation.replace('Verification')}>
                <FontAwesome5 style={styles.icon} name="house-user" size={20} color="#2C6FC7" />
                <Text style={styles.menu}>Verifications </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.btn_menu} onPress={() => navigation.navigate('CreateFee')}>
                <MaterialIcons style={styles.icon} name="monetization-on" size={20} color="#2C6FC7" />
                <Text style={styles.menu}> Create Fee </Text>
              </TouchableOpacity> */}
            </>
          )}
          <TouchableOpacity style={styles.btn_logout} onPress={() => logout()}>
            <Ionicons style={styles.icon} name="power-outline" size={20} color="#2C6FC7" />

            <Text style={styles.logout}> Logout </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    backgroundColor: '#161C2B',
    width: '100%',
    height: '100%',
    top: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: -20,
  },
  column: {
    flexDirection: 'column',
    width: '100%',
    position: 'absolute',
    top: 70,
  },
  account: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    position: 'absolute',
    top: 30,
    left: 30,
  },
  btn_menu: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    width: '100%',
    borderColor: '#707070',
    borderWidth: 0.18,
    marginTop: 1,
    flexDirection: 'row',
  },
  menu: {
    fontFamily: 'Ubuntu_300Light',
    fontSize: 15,
    color: '#404040',
    textAlign: 'left',
    marginLeft: '8%',
  },
  icon: {
    marginLeft: '7%',
  },
  btn_logout: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    width: '100%',
    borderColor: '#707070',
    borderWidth: 0.1,
    marginTop: 1,
    flexDirection: 'row',
    marginTop: 30,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  logout: {
    fontFamily: 'Ubuntu_300Light',
    fontSize: 15,
    color: '#404040',
    textAlign: 'left',
    marginLeft: '8%',
  },
});

export default Menu;
