import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts, Ubuntu_300Light, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { AntDesign } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogedIn, setUserLogedIn } from '../helpers/storange';
import callServerV2 from '../helpers/callServer.v2';
import Loading from '../components/Loading';

export default function Waiting({ navigation }) {
  let [loaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    Montserrat_500Medium,
  });

  const dispatch = useDispatch();

  const [userLogin, setUserLogin] = useState(null);
  const [message, setMessage] = useState({
    type: '',
    content: '.',
  });

  useEffect(() => {
    (async () => {
      const user = await getUserLogedIn();
      setUserLogin(user);
    })();
  }, []);

  useEffect(() => {
    if (userLogin) {
      if (userLogin.hasOwnProperty('access_token')) {
        dispatch(
          callServerV2({
            url: 'users/' + userLogin.id,
            stage: 'checkUser',
            headers: {
              access_token: userLogin.access_token,
            },
            type: 'SET_USER',
          }),
        );
      } else {
        console.log('Session Expired');
        navigation.replace('Login');
      }
    }
  }, [userLogin]);

  const { user, stage, loading } = useSelector((state) => state.reducerUser);

  useEffect(() => {
    (async () => {
      if (stage === 'checkUser') {
        const { fullname, status } = user;
        const splitName = fullname.split('#');
        let message = {
          type: 'default',
          content: 'Please wait...\n until your account \n is verified.',
        };
        if (splitName[1] == 'declined') {
          message = {
            type: 'declined',
            content: 'Your Request is decline \n Click next to Repickup \n Your valid location!',
          };
        } else if (status === 'Active') {
          message = {
            type: 'Verified',
            content: 'Your account is verified\n Click next to connect \n with your neighbour.',
          };
        }

        setMessage({
          ...message,
          fullname: splitName[0],
        });

        const newUser = {
          ...user,
          fullname: splitName[0],
        };
        await setUserLogedIn(newUser);
      }
    })();
  }, [user]);

  const toDiscover = () => {
    navigation.replace('Discover');
  };

  const toPickLocation = () => {
    navigation.replace('PickLocation');
  };

  const toNext = (status, isdeclined) => {
    if (message.type === 'declined') {
      toPickLocation();
    } else if (message.type === 'Verified') {
      toDiscover();
    }
  };

  if (loading || !loaded ) return <Loading />;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.firstLine}> {statusUser}, {user.fullname}! </Text> */}
      <Image style={styles.waiting} source={require('../assets/waiting.png')} />
      <View style={styles.box}>
        <Text style={styles.firstLine}> Hi, {message.fullname}! </Text>
        <Text style={styles.secondLine}>
          {/* <Text style={styles.secondLine}> Please wait... {"\n"} until your account {"\n"} is verified.</Text> */}{' '}
          {/* Status User {statusUser + ' ' + splitName[1] + ' '} Split Name */}
          {message.content}
        </Text>
      </View>
      {message.type === 'declined' || message.type === 'Verified' ? (
        <View style={styles.footer}>
          <View style={styles.row} onPress={() => toNext()}>
            <Text style={styles.next} onPress={() => toNext()}>
              {' '}
              Next{' '}
            </Text>
            <TouchableOpacity style={styles.btn_next} onPress={() => toNext()}>
              <AntDesign name="right" size={16} color="black" />
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
