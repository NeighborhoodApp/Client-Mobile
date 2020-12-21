import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import SvgUri from 'expo-svg-uri';
// import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Avatar, TextInput } from 'react-native-paper';
// import {Card, Avatar} from 'react-native-paper';
// import { Button, Paragraph, Dialog, Portal, Provider, TextInput } from 'react-native-paper';
import { Agenda } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import callServerV2 from '../helpers/callServer.v2';
import { getUserLogedIn } from '../helpers/storange';
import Loading from '../components/Loading';
import BottomNavigator from '../components/BottomNavigator'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const EventCalendar = ({ navigation }) => {
  const [items, setItems] = useState({});
  const [userLogin, setUserLogin] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isFocused, setIsFocused] = useState('true');

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const userLogedIn = await getUserLogedIn();
      setUserLogin(userLogedIn);
    })();
  }, []);
  
  const fetchEvents = () => {
    (async () => {
      if (userLogin) {
        if (userLogin.hasOwnProperty('access_token')) {
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
  };
  useEffect(() => {
    fetchEvents()
  }, [userLogin]);

  const { events, loading } = useSelector((state) => state.reducerEvent);
  useEffect(() => {
    (async () => {
      if (userLogin) {
        const newItems = {};
        events.forEach((el) => {
          if (el.RealEstateId === userLogin.RealEstateId) {
            const date = timeToString(el.date);
            if (!newItems[date]) {
              newItems[date] = [];
            }
            newItems[date].push({
              height: 107,
              eventId: el.id,
              name: el.name,
              tetonggo: el.User.fullname,
              description: el.description,
              category: el.Category.category,
              realEstateName: el.RealEstate.name,
              backgroundColor: getColor(el.CategoryId),
            });
          }
        });
        setItems(newItems);
      }
    })();
  }, [events]);

  const getColor = (categoryId) => {
    if (categoryId == 1) return '#9CEFFE';
    if (categoryId == 2) return '#2FBBF0';
    if (categoryId == 3) return '#ff9b93';
  };

  const loadItems = (day) => {
    console.log('day selected', day);
    for (let i = -15; i < 80; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      if (!items[strTime]) {
        items[strTime] = [];
      }
      const selectedDay = new Date(strTime);
      const currentDay = new Date(new Date().toISOString().slice(0, 10));
      if (selectedDay > currentDay) {
        const found = items[strTime].filter((el) => el.category === 'addnewitem');
        if (found.length < 1) {
          items[strTime].push({
            category: 'addnewitem',
            date: strTime,
            backgroundColor: '#cddef6',
          });
        }
      }
    }

    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    setItems(newItems);
  };

  const renderItem = (item) => {
    return item.category == 'addnewitem' ? (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: item.backgroundColor }]}
        onPress={() => navigation.navigate('CreateEvent', { date: item.date })}
      >
        <FontAwesome
          name="plus"
          size={20}
          color="black"
          style={{ marginRight: 5, textAlign: 'center', textAlignVertical: 'center' }}
        />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[styles.item]}
        onPress={() => navigation.navigate('EventDetail', {eventId: item.eventId})}
      >
        <View style={[[styles.card]]}>
          <View style={[styles.header]}>
            <View style={[styles.title]}>
              <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
              <Text style={{ fontWeight: '300' }}>
                {item.tetonggo} | {item.realEstateName}
              </Text>
            </View>
            <View style={[styles.avatar]}>
              <Avatar.Image
                size={39}
                source={{
                  uri: `https://randomuser.me/api/portraits/men/1.jpg`,
                }}
              />
            </View>
          </View>
          <View style={[styles.hr]} />
          <Text>{item.description}</Text>
          <View style={[styles.footer]}>
            <View style={[styles.title]}>
              <Text style={[styles.category, { backgroundColor: item.backgroundColor }]}>{item.category}</Text>
            </View>
            <View>
              {/* <Text style={[styles.time, { backgroundColor: item.backgroundColor }]}>{item.name}</Text> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = (item) => {
    return (
      <View
        style={{
          height: 15,
          flex: 1,
          justifyContent: 'center',
          marginTop: 15,
          paddingHorizontal: 10,
          borderRadius: 5,
          backgroundColor: 'white',
        }}
      >
        <Text>No event</Text>
      </View>
    );
  };
  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      if (userLogin) {
        fetchEvents()
      }
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) return <Loading />;

  return (
    <View style={{ flex: 1, backgroundColor: '#161C2B' }}>
      <Agenda
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        items={items}
        loadItemsForMonth={loadItems}
        selected={timeToString(new Date())}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        markedDates={{
          [timeToString(new Date())]: { selected: true, selectedDayTextColor: 'blue' },
        }}
        rowHasChanged={rowHasChanged}
        style={{borderTopLeftRadius: 25, borderTopRightRadius: 25}}
      />
      <BottomNavigator currentPage={'EventCalendar'} navigation={navigation}></BottomNavigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {},
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.25,
    width: '100%',
    marginBottom: 8,
    marginTop: 8,
  },
  footer: {
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    backgroundColor: 'gold',
    // marginTop: 10,
    marginBottom: 5,
    padding: 6,
    borderRadius: 5,
  },
  action: {
    width: 100,
  },
});

export default EventCalendar;
