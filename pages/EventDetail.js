import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

import { Ubuntu_300Light } from '@expo-google-fonts/ubuntu';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLogedIn, setUserLogedIn } from '../helpers/storange';
import callServerV2 from '../helpers/callServer.v2';
import Loading from '../components/Loading';

const ePengajian = require('../assets/icon_events/e_pengajian.png');
const eRapat = require('../assets/icon_events/e_rapat.png');
const eLainnya = require('../assets/icon_events/e_others.png');

export default function EventDetail({ navigation, route }) {
  const [userLogin, setUserLogin] = useState(null);

  const dispatch = useDispatch();

  let [loaded] = useFonts({
    Poppins_600SemiBold,
    Ubuntu_300Light,
  });

  const eventId = route.params ? route.params.eventId : 1;

  useEffect(() => {
    (async () => {
      const userLogedIn = await getUserLogedIn();
      setUserLogin(userLogedIn);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (userLogin) {
        if (userLogin.hasOwnProperty('access_token')) {
          dispatch(
            callServerV2({
              url: `event/${eventId}`,
              stage: 'getEvent',
              method: 'get',
              headers: {
                access_token: userLogin.access_token,
              },
              type: 'SET_EVENT',
            }),
          );
        }
      }
    })();
  }, [userLogin]);

  const { event, loading } = useSelector((state) => state.reducerEvent);

  useEffect(() => {
    if (event && event.hasOwnProperty('id')) {
      console.log('Eventsss....', event);
    }
  }, [event]);

  const eventImage = () => {
    if (event.Category.category === 'Pengajian') {
      return ePengajian;
    } else if (event.Category.category === 'Arisan') {
      return eRapat;
    } else if (event.Category.category === 'Lainnya') {
      return eLainnya;
    } 
  };

  if (!loaded) return <AppLoading />;
  if (loading || !event) return <Loading />;

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.border}></View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* <Text style={styles.account}>My Tetonggo</Text> */}
        <View style={styles.box}>
          <View>
            <Text style={styles.name}>{event.name}</Text>
            <Text>{ event.Category.category } | {new Date(event.date).toDateString()}</Text>
          </View>
          <View style={styles.hr} />
          <View style={[styles.body]}>
            {/* <Text style={styles.name}>Description</Text> */}
            <Text styles={styles.location}>{event.description}</Text>
          </View>
          <TouchableOpacity
          // onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.row}>
              <Avatar.Image
                size={39}
                source={{
                  uri: `https://randomuser.me/api/portraits/men/${event.User.id}.jpg`,
                }}
              />

              <View style={styles.boxProfile}>
                <Text style={styles.name}>{event.User.fullname}</Text>
                <Text styles={styles.location}>{event.RealEstate.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View>
        <Image style={styles.svgimgae} source={eventImage()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    backgroundColor: '#fff', //'#fff',
    width: '100%',
    height: '100%',
    top: 0,
  },
  svgimgae: {
    width: 450,
    height: 300,
    alignSelf: 'flex-start',
    marginLeft: -30,
    position: 'absolute',
    bottom: 10,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'red',
    minHeight: 150,
    justifyContent: 'space-between',
  },
  border: {
    position: 'absolute',
    backgroundColor: '#161C2B',
    width: '100%',
    height: '10%',
    top: 0,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollView: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    marginTop: 10,
    // backgroundColor: '#161C2B',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 10,
    // backgroundColor: '#FAFAFA',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
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
  account: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    position: 'relative',
    marginTop: 20,
    marginLeft: 40,
    alignSelf: 'flex-start',
  },
  col: {
    position: 'absolute',
    flexDirection: 'column',
    width: '100%',
    top: 0,
  },
  boxAwal: {
    flexDirection: 'column',
    width: '100%',
    marginLeft: '15%',
    marginTop: 50,

    fontSize: 25,
    marginBottom: 20,
  },
  box: {
    flexDirection: 'column',
    // backgroundColor: 'red',
    width: '100%',
    marginTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  row: {
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '1%',
    marginTop: 10,
  },
  boxProfile: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
    marginBottom: 5,
  },
  column: {
    flexDirection: 'column',
    marginLeft: 15,
  },
  name: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    marginBottom: 1,
    fontWeight: 'bold',
  },
  status: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    marginTop: 12,
    marginBottom: 8,
  },
  inputText: {
    width: '100%',
    marginTop: 15,
    marginBottom: 5,
    fontSize: 18,
  },
  location: {
    fontFamily: 'Ubuntu_300Light',
    fontSize: 12,
  },
  boxText: {
    width: '97%',
  },
  boxImage: {
    width: '100%',
  },
  boxCard: {
    width: '90%',
  },
  card: {
    justifyContent: 'flex-start',
    width: '94%',
  },
  hr: {
    borderBottomColor: '#A2A2A2',
    borderBottomWidth: 0.25,
    marginBottom: 8,
    marginTop: 5,
  },
  inputStatus: {
    width: '90%',
    marginTop: 15,
    marginBottom: 15,
    fontSize: 18,
    color: 'white',
    marginLeft: 15,
  },
  boxStatus: {
    width: '96%',
    backgroundColor: '#161C2B',
    borderRadius: 10,
    borderWidth: 0.5,
  },
  cardStatus: {
    zIndex: -999,
    marginBottom: 10,
    justifyContent: 'flex-start',
    width: '94%',
  },
  addPhotos: {
    fontFamily: 'Ubuntu_300Light',
    fontSize: 13,
    marginTop: 3,
    fontWeight: 'bold',
    marginLeft: 10,
    justifyContent: 'center',
    borderWidth: 0.5,
    padding: 5,
    paddingHorizontal: 13,
    height: 29,
    backgroundColor: '#FAFAFA',
    borderColor: '#E3E3E3',
    borderRadius: 5,
  },
});
