import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import SvgUri from 'expo-svg-uri';
// import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
// import {Card, Avatar} from 'react-native-paper';
// import { Button, Paragraph, Dialog, Portal, Provider, TextInput } from 'react-native-paper';
import { Agenda } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import callServerV2 from '../helpers/callServer.v2';
import { getUserLogedIn } from '../helpers/storange';
import Loading from '../components/Loading';
import { FontAwesome } from '@expo/vector-icons';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const EventCalendar = ({ navigation }) => {
  const [items, setItems] = useState({});
  const [userLogin, setUserLogin] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState('true');

  const dispatch = useDispatch();

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
        const newItems = {};
        events.forEach((el) => {
          if (el.RealEstateId === userLogin.RealEstateId) {
            const date = timeToString(el.date);
            if (!newItems[date]) {
              newItems[date] = [];
            }
            newItems[date].push({
              height: 107,
              name: el.name,
              tetonggo: el.User.fullname,
              description: el.description,
              category: el.Category.category,
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
    for (let i = -15; i < 10; i++) {
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
        onPress={() => navigation.navigate('CreateEvent')}
      >
        <FontAwesome
          name="plus"
          size={20}
          color="black"
          style={{ marginRight: 5, textAlign: 'center', textAlignVertical: 'center' }}
        />
        {/* <Text style={{ fontWeight: 'bold' }}>Category: {item.category}</Text> */}
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: item.backgroundColor }]}
        // onPress={() => navigation.navigate('CreateEvent')}
      >
        <Text style={{ fontWeight: 'bold' }}>Event Owner: {item.tetonggo}</Text>
        <Text style={{ fontWeight: 'bold' }}>Category: {item.category}</Text>
        <Text style={{ fontWeight: 'bold' }}>Title: {item.name}</Text>
        <Text>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = (item) => {
    return (
      <View
        style={{
          height: 15,
          flex: 1,
          paddingTop: 30,
        }}
      >
        <Text>This is empty date!</Text>
      </View>
    );
  };
  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  if (loading) return <Loading />;

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={new Date().toISOString().slice(0, 10)}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        markedDates={{
          [new Date().toISOString().slice(0, 10)]: { selected: true, selectedDayTextColor: 'blue' },
        }}
        rowHasChanged={rowHasChanged}
      />
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
});

export default EventCalendar;
