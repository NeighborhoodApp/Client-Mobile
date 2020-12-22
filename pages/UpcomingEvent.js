import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import { Ubuntu_300Light } from '@expo-google-fonts/ubuntu';
import BottomNavigator from '../components/BottomNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import { getUserLogedIn } from '../helpers/storange';
import callServerV2 from '../helpers/callServer.v2';
import Loading from '../components/Loading';

const timeToString = (time) => {
  const date = new Date(time);
  // return date.toISOString().split('T')[0];
  return date.toISOString().slice(0, 10);
};

export default function UpcomingEvent({ navigation }) {
  const [userLogin, setUserLogin] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const dispatch = useDispatch();

  let [loaded] = useFonts({
    Poppins_600SemiBold,
    Ubuntu_300Light,
  });

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
          setupNavigation();
          dispatch(
            callServerV2({
              url: `event`,
              stage: 'getEvents',
              method: 'get',
              body: null,
              headers: {
                access_token: userLogin.access_token,
              },
              type: 'SET_EVENTS',
            }),
          );
        }
      }
    })();
  }, [userLogin]);

  const { events, loading } = useSelector((state) => state.reducerEvent);

  useEffect(() => {
    (async () => {
      if (userLogin) {
        const upcoming = [];
        events.forEach((el) => {
          if (el.RealEstateId === userLogin.RealEstateId) {
            const now = new Date();
            const date = timeToString(el.date);
            const curDate = timeToString(now);
            const hmin1 = timeToString(now.setDate(now.getDate() + 1));

            if (date === hmin1 || date === curDate) {
              upcoming.push(el);
            }
          }
        });
        upcoming.sort((a, b) => a.date > b.date);
        setUpcoming(upcoming);
      }
    })();
  }, [events]);

  const setupNavigation = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 30, borderWidth: 3, borderColor: 'white', borderRadius: 50 }}
          onPress={() => {
            navigation.navigate('Menu');
          }}
        >
          <Avatar.Image
            size={39}
            source={{
              uri: `https://randomuser.me/api/portraits/men/1.jpg`,
            }}
          />
        </TouchableOpacity>
      ),
    });
  };

  if (loading || !loaded ) return <Loading />;

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.border}></View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.account}>Upcoming Events</Text>
        <View style={styles.hr} />
        <View style={styles.box}>
          {upcoming.map((el) => {
            return (
              <TouchableOpacity
                key={el.id}
                onPress={() => navigation.navigate('EventDetail', {eventId: el.id})}
              >
                <View style={styles.row}>
                  <Avatar.Image
                    size={39}
                    source={{
                      uri: `https://randomuser.me/api/portraits/men/${el.User.id}.jpg`,
                    }}
                  />

                  <View style={styles.boxProfile}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={styles.name}>{el.name + ' '}</Text>
                      <Text>
                        <FontAwesome5
                          name="clock"
                          size={13}
                          color="orange"
                          style={{ textAlign: 'center', textAlignVertical: 'center' }}
                        />
                        {' ' + new Date(el.date).toDateString()}
                      </Text>
                    </View>

                    <Text styles={styles.location}>
                      {el.User.fullname} | {el.RealEstate.name}
                    </Text>
                  </View>
                </View>
                <View style={styles.hr} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <BottomNavigator
        currentPage={'Notification'}
        navigation={navigation}
        // submitHandler={submitHandler}
      ></BottomNavigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    top: 0,
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
    marginBottom: 10,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 50,
    width: '100%',
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
    marginBottom: 15,
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
    marginLeft: '10%',
    marginTop: 50,

    fontSize: 25,
    marginBottom: 20,
  },
  box: {
    flexDirection: 'column',
    width: '100%',
    paddingLeft: '8%',
    paddingRight: '8%',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '1%',
  },
  boxProfile: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 25,
    marginBottom: 5,
  },
  column: {
    flexDirection: 'column',
    marginLeft: 15,
  },
  name: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
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
    width: '100%',
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
