import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useFonts, Ubuntu_300Light, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { AntDesign } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useDispatch, useSelector } from 'react-redux';
import callServer from '../helpers/callServer';
import { actionRemoveRealEstate, actionRemoveUser } from '../store/actions/action';

const defaultValue = {
  address: '',
  email: '',
  fullname: '',
  id: '',
  status: 'Inactive'
};

let statusUser = null;
let tempUser = null;
export default function Waiting({ navigation }) {
  let [loaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    Montserrat_500Medium,
  });

  const dispatch = useDispatch();

  const [user, setUser] = useState(defaultValue);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [message, setMessage] = useState({
    type: '',
    content: '.',
  });

  // ! Pertama
  useEffect(() => {
    const preload = async () => {
      setMessage({
        type: 'default',
        content: 'Please wait...\n until your account \n is verified.',
      });
      setHasLoaded(false);
      dispatch(actionRemoveUser());
      let rawData = await AsyncStorage.getItem('userlogedin');
      let dataJson = JSON.parse(rawData); 

      if (dataJson) {
        const option = {
          url: 'users/' + dataJson.id,
          stage: 'null',
          method: 'get',
          body: null,
          headers: null, // true
          type: 'SET_USER',
        };
        dispatch(callServer(option));
      } else {
        Alert.alert('Session Expired', `Please, login first!`, [
          // { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Ok',
            style: 'destructive',
            onPress: () => navigation.replace('Login'),
          },
        ]);
      }
    };
    preload();
  }, []);

  const { user: userRedux, loading, error, stage } = useSelector((state) => state.reducerUser);

  const toDiscover = () => {
    navigation.replace('Discover');
  };

  const toPickLocation = () => {
    navigation.replace('PickLocation');
  };

  const toNext = (status, isdeclined) => {
    if (message.type === 'declined') {
      toPickLocation();
    } else if (message.type === 'verify') {
      toDiscover();
    }
  };
  
  // ! Kedua
  if (!hasLoaded && userRedux) {
    setHasLoaded(true);
    const prosesData = async () => {
      const { RoleId, address, email, RealEstateId, ComplexId, expoPushToken, fullname, id, status } = userRedux;
      const payload = { RoleId, address, email, RealEstateId, ComplexId, expoPushToken, fullname, id, status };
      try {
        payload.coordinate = userRedux.RealEstate.coordinate;
        const json = JSON.parse(JSON.stringify(userRedux));
        const splitName = json.fullname.split('#');
        payload.fullname = splitName[0];

        // console.log(userRedux, 'User REdux.........')
        if (splitName[1] === 'declined') {
          payload.RealEstateId = null;
          payload.ComplexId = null;
          setMessage({
            fullname,
            type: 'declined',
            content: 'Your Request is decline \n Click next to Repickup \n Your valid location!',
          });
        } else if (status === 'active') {
          setMessage({
            fullname,
            type: 'verify',
            content: 'Your account is verified\n Click next to connect \n with your neighbour.',
          });
        } else if (status === 'inactive') {
          setMessage({
            fullname,
            type: 'inactive',
            content: 'Please wait...\n until your account \n is verified.',
          });
        }
        setUser(payload);
        const jstrify = JSON.stringify(payload);
        await AsyncStorage.setItem('userlogedin', jstrify);
      } catch (error) {
        console.log(error)
      }
      
    }
    prosesData();
  }

  console.log(message, '................................')

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
      {message.type === 'declined' || message.type === 'verify' ? (
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
