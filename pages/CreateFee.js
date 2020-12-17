import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native'
import { Button, Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
// import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import callServer from '../helpers/callServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CreateEvent({ navigation }) {
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [isFocused1, setIsFocused1] = useState(true);
  const [isFocused2, setIsFocused2] = useState(true);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      const json = JSON.parse(value);
      setUser(json);
    };
    getUser();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const setStyle = () => {
    setIsFocused(!isFocused);
    setIsFocused1(isFocused);
    setIsFocused2(isFocused);
    setCategory(1);
  };
  const setStyle1 = () => {
    setIsFocused1(!isFocused1);
    setIsFocused(isFocused1);
    setIsFocused2(isFocused1);
    setCategory(2);
  };
  const setStyle2 = () => {
    setIsFocused2(!isFocused2);
    setIsFocused1(isFocused2);
    setIsFocused(isFocused2);
    setCategory(3);
  };

  const handleInputDesc = (text) => {
    setDescription(text);
  };

  const handleInputName = (text) => {
    setName(text);
  };

  const handleAddFee = () => {
    const addFee = () => {
      const option = {
        url: `fee`,
        stage: 'addFee',
        method: 'post',
        body: {
          name: name,
          description: description,
          due_date: date,
          RealEstateId: user.RealEstateId,
          ComplexId: user.ComplexId,
        },
        headers: true,
        type: 'ADD_FEE',
      };
      dispatch(callServer(option));
    };
    addFee();
    Alert.alert('Success', `${name} fee is created! Your neighbours will receive a notification in a short notice`, [
      // { text: "Don't leave", style: 'cancel', onPress: () => {} },
      {
        text: 'Ok',
        style: 'destructive',
        onPress: () => navigation.replace('Menu'),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={{ height: 130, marginTop: 20, marginLeft: 20 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={isFocused ? styles.button1 : styles.button2}
              onPress={() => setStyle()}
              disabled={!isFocused}
            >
              <Image
                style={isFocused ? styles.image1 : styles.image2}
                source={require('../assets/icon_events/e_rapat.png')}
              />
              <Text style={isFocused ? styles.textBtn1 : styles.textBtn2}>Arisan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={isFocused1 ? styles.button1 : styles.button2}
              onPress={() => setStyle1()}
              disabled={!isFocused1}
            >
              <Image
                style={isFocused1 ? styles.image1 : styles.image2}
                source={require('../assets/icon_events/e_pengajian.png')}
              />
              <Text style={isFocused1 ? styles.textBtn1 : styles.textBtn2}>Pengajian</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={isFocused2 ? styles.button1 : styles.button2}
              onPress={() => setStyle2()}
              disabled={!isFocused2}
            >
              <Image
                style={isFocused2 ? styles.image1 : styles.image2}
                source={require('../assets/icon_events/e_others.png')}
              />
              <Text style={isFocused2 ? styles.textBtn1 : styles.textBtn2}>Others</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <Text style={{ alignSelf: 'flex-start', marginLeft: 30, fontWeight: '600', color: '#666E83', marginTop: 20 }}>
          Title
        </Text>
        <TextInput
          placeholder="Tetonggo Fee"
          style={{ height: '6%', width: '80%', backgroundColor: 'white', borderBottomColor: 'black' }}
          onChangeText={(text) => handleInputName(text)}
        ></TextInput>
        <Text
          style={{
            textAlign: 'left',
            alignSelf: 'flex-start',
            marginLeft: 30,
            marginBottom: 10,
            fontWeight: '600',
            color: '#434853',
            marginTop: 20,
          }}
        >
          Date
        </Text>
        {/* <TextInput
          placeholder="Date"
          style={{ height: '6%', width: '80%', backgroundColor: 'white', borderBottomColor: 'black' }}
        ></TextInput> */}
        <View>
          <View>
            <Button onPress={showDatepicker} title="Pick a Date" />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button onPress={showTimepicker} title="Pick a time" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <Text
            style={{
              textAlign: 'left',
              alignSelf: 'flex-start',
              marginLeft: 30,
              marginBottom: 10,
              fontWeight: '600',
              color: '#434853',
              marginTop: 20,
            }}
          >
            {date.toDateString()}
          </Text>
        </View>
        <Text
          style={{
            textAlign: 'left',
            alignSelf: 'flex-start',
            marginLeft: 30,
            marginBottom: 10,
            fontWeight: '600',
            color: '#434853',
            marginTop: 20,
          }}
        >
          Add a Note
        </Text>
        <TextInput
          placeholder="Write a note here"
          style={{ height: '6%', width: '80%', backgroundColor: 'white', borderBottomColor: 'black' }}
          onChangeText={(text) => handleInputDesc(text)}
        ></TextInput>
        <TouchableOpacity
          style={{ width: '70%', height: 40, backgroundColor: '#161C2B', paddingVertical: 10, marginTop: 30 }}
          onPress={() => handleAddFee()}
        >
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: 'white' }}>SAVE</Text>
        </TouchableOpacity>
        {/* <Button title=" x " onPress={toggleModal} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 10,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
  button1: {
    height: 110,
    width: 90,
    marginRight: 20,
    justifyContent: 'center',
    backgroundColor: '#E2FBFF',
    borderRadius: 10,
  },
  image1: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    backgroundColor: '#161C2B',
    borderRadius: 40,
  },
  textBtn1: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    color: '#000',
  },
  button2: {
    height: 110,
    width: 90,
    marginRight: 20,
    justifyContent: 'center',
    backgroundColor: '#161C2B',
    borderRadius: 10,
  },
  textBtn2: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    color: '#fff',
  },
  image2: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    backgroundColor: '#E2FBFF',
    borderRadius: 40,
  },
});

export default CreateEvent;
