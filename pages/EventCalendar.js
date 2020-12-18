import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import callServer from '../helpers/callServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading'

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const EventCalendar = ({ navigation }) => {
  const [dateNow, setDateNow] = useState()
  // const [filterFees, setFilterFees] = ([])
  // const [filterEvents, setFilterEvents] = ([])
  const [items, setItems] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState('true');
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const tes = async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      const json = JSON.parse(value);
      setUser(json);
    }
    tes()
    setDateNow(new Date())
    const fetchFee = () => {
      const option = {
        url: `fee`,
        stage: 'getFees',
        method: 'get',
        body: null,
        headers: true,
        type: 'SET_FEES',
      };
      dispatch(callServer(option));
    };
    fetchFee()

    const fetchEvent = () => {
      const option = {
        url: `event`,
        stage: 'getEvents',
        method: 'get',
        body: null,
        headers: true,
        type: 'SET_EVENTS',
      };
      dispatch(callServer(option));
    };
    fetchEvent()
  }, [])
  
  const { fees, loading, error, stage } = useSelector((state) => state.reducerFee);
  const { events } = useSelector((state) => state.reducerEvent);
  if (!user) return <Loading />
  console.log('..........events')
  console.log(fees[0], 'feesss...')
  console.log(events[0], 'event...')
  const loadItems = (day) => {
    setTimeout(() => {
      const filterFees = fees.filter(el => el.ComplexId === user.ComplexId)
      const filterEvents = events.filter(el => el.RealEstateId === user.RealEstateId)

      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        // let temp = {...items}
        // console.log(strTime, 'sssssssssssss')
        // fees.forEach(el => {
        //   if (el.due_date.includes(strTime)) {
        //     temp[strTime]
        //   }
        // });
        // let found = true

        if (!items[strTime]) {
          items[strTime] = [];

          filterFees.forEach(el => {
            if (el.due_date.includes(strTime)) {
              // found = false
              items[strTime].push({
                name: el.name,
                description: el.description,
                height: 100,
                backgroundColor: '#fff3b2'
              });
            }
          })
          filterEvents.forEach(el => {
            if (el.date.includes(strTime)) {
              // found = false
              items[strTime].push({
                name: 'Event',
                description: el.description,
                height: 100,
                backgroundColor: (el.CategoryId === 1) ? '#ffe0d8' : '#ff9b93'
              });
            }
          })
        }
        // if (found) {
        //   items[strTime].push({
        //     name: '',
        //     description: '',
        //     height: 100,
        //   });
        // }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        console.log(key)
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };
  // console.log(fees)
  const renderItem = (item) => {
    console.log(item.backgroundColor)
    return (
      <TouchableOpacity
        style={[styles.item, { height: item.height, backgroundColor: item.backgroundColor }]}
      // onPress={() =>
      //   navigation.navigate('CreateEvent', {
      //     date: item.name,
      //   })
      // }
      >
        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        <Text >{item.description}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = (item) => {
    return (
      <View
        style={[styles.item, { height: 60, backgroundColor: 'white'}]}
      >
        {/* <Text>This is empty date!</Text> */}
      </View>
    );
  };
  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={dateNow}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        markedDates={{
          dateNow: { selected: true, selectedDayTextColor: 'blue' },
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
    // backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});

export default EventCalendar;
