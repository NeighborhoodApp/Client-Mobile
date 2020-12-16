import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts, Ubuntu_300Light, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useDispatch, useSelector } from 'react-redux';
import callServer from '../helpers/callServer';

const defaultValue = {
  address: '',
  email: '',
  fullname: '',
  id: '',
  status: 'Inactive'
};

let dataJson = {};
let splitName = [];
let statusUser = null;
let render = 1;
let hasLoad = false;

export default function Waiting({ navigation }) {
  let [loaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    Montserrat_500Medium,
  });
  render++;
  const dispatch = useDispatch();

  const toDiscover = () => {
    navigation.replace('Discover');
  };

  const toPickLocation = () => {
    navigation.replace('PickLocation');
  };

  const toNext = ((status, isdeclined) => {
    if (message.type === 'declined') { 
      toPickLocation();
    } else if (message.type === 'verify') {
      toDiscover();
    }
  });

  const [user, setUser] = useState(defaultValue);
  const [message, setMessage] = useState(null);
  const { user: userRedux, loading, error, stage } = useSelector((state) => state.reducerUser);

  useEffect(() => {
    hasLoad = false;
    setMessage({ type: 'inactive', content: 'Please wait...\n until your account \n is verified.'});
    const getUser = async () => {
      try {
        dataJson = await AsyncStorage.getItem('userlogedin');
        dataJson = JSON.parse(dataJson);
        setUser(dataJson);
        fetchUser(dataJson);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    console.log('useEffect 1');
  }, []);

  useEffect(() => {
    console.log('useEffect 2');
    if (!hasLoad) {
      if (userRedux) {
        const name = userRedux.fullname;
        if (name) {
          console.log('useEffect 2 Name', name);
          const splitName = name.split('#');
          if (splitName[1] === 'declined') {
            hasLoad = true;
            updateUser(splitName[0]);
            updateStorange();
            setMessage({
              type: 'declined',
              content: 'Your Request is decline \n Click next to Repickup \n Your valid location!',
            });
          } else if (statusUser === 'active') {
            setMessage({
              type: 'verify',
              content: 'Your account is verified\n Click next to connect \n with your neighbour.',
            });
          } else if (statusUser === 'inactive') {
            setMessage({
              type: 'inactive',
              content: 'Please wait...\n until your account \n is verified.',
            });
          }
        }
      }
    }
  }, [loading]);

  const fetchUser = (dataJson) => {
    const option = {
      url: 'users/' + dataJson.id,
      stage: 'null',
      method: 'get',
      body: null,
      headers: null, // true
      type: 'SET_USER',
    };
    dispatch(callServer(option));
  };

  const updateUser = (name) => {
    const payload = {
      fullname: name,
      address: dataJson.address,
      RoleId: dataJson.RoleId,
      RealEstateId: null,
      ComplexId: null,
    };

    const option = {
      url: 'users/' + dataJson.id,
      stage: 'getUsers',
      method: 'PUT',
      body: payload,
      headers: null, // true
      type: 'UPDATE_USER',
    };
    dispatch(callServer(option));
  };

  const updateStorange = async () => {
    const rawData = await AsyncStorage.getItem('userlogedin');
    const data = JSON.parse(rawData)
    const newUser = {
      ...data,
      RealEstateId: null,
      ComplexId: null
    };
    try {
      const jsonValue = JSON.stringify(newUser);
      await AsyncStorage.setItem('userlogedin', jsonValue);
      const rawData = await AsyncStorage.getItem('userlogedin');
      console.log(rawData, 'rawData');
    } catch (error) {
      console.log(error);
    }
  };

  if (!hasLoad && !stage === 'getUsers') {
    console.log(render);
    hasLoad = true;
    const { id, fullname, address, RoleId, RealEstateId, ComplexId, status } = userRedux;
    splitName = fullname.split('#');
    statusUser = status.toLowerCase();
    console.log(splitName, 'splitName');
  }

  if (!loaded) return <AppLoading />;

  // console.log(splitName[1] == 'declined, statusUser);
  return (
    <View style={styles.container}>
      {/* <Text style={styles.firstLine}> {statusUser}, {user.fullname}! </Text> */}
      <Image style={styles.waiting} source={require('../assets/waiting.png')} />
      <View style={styles.box}>
        <Text style={styles.firstLine}> Hi, {user.fullname}! </Text>
        <Text style={styles.secondLine}>
          {/* <Text style={styles.secondLine}> Please wait... {"\n"} until your account {"\n"} is verified.</Text> */}{' '}
          {/* Status User {statusUser + ' ' + splitName[1] + ' '} Split Name */}
          {message.content}
        </Text>
      </View>
      {(message.type === 'declined' || message.type === 'verify') ? (
        <View style={styles.footer}>
          <View style={styles.row} onPress={() => toNext()}>
            <Text style={styles.next} onPress={() => toNext()}>
              {' '}
              Next{' '}
            </Text>
            <TouchableOpacity style={styles.btn_next}>
              <AntDesign name="right" size={16} color="black" onPress={() => toNext()} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waiting: {
    width: 680,
    height: 380,
    alignSelf: 'flex-start',
    marginLeft: 50,
    marginTop: 90,
  },
  box: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -20,
    backgroundColor: '#161C2B',
    paddingVertical: '20%',
    width: '100%',
    height: '45%',
    bottom: 0,
  },
  footer: {
    backgroundColor: '#161C2B',
    position: 'absolute',
    alignSelf: 'flex-end',
    position: 'absolute',
    height: '5%',
    width: '100%',
    bottom: 0,
  },
  firstLine: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  secondLine: {
    marginTop: 30,
    fontFamily: 'Montserrat_500Medium',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingBottom: 2,
  },
  declinedext: {
    marginTop: 30,
    fontFamily: 'Montserrat_500Medium',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingBottom: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 10,
  },
  next: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 15,
    color: 'white',
    right: 20,
  },
  btn_next: {
    backgroundColor: '#9CEFFE',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 8,
    right: 10,
    bottom: 5,
  },
});
