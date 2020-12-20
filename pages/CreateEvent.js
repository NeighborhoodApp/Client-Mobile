import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import callServer from '../helpers/callServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendNotification } from '../helpers/PushNotification';
import customAlert from '../helpers/alert';
import callServerV2 from '../helpers/callServer.v2';
import { getUserLogedIn } from '../helpers/storange';

function CreateEvent({ navigation, route }) {
  const [userLogin, setUserLogin] = useState(null);
  const [payload, setPayload] = useState({
    name: '',
    description: '',
    image: 'noimage',
    date: route.params.date,
    CategoryId: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const userLogedIn = await getUserLogedIn();
      setUserLogin(userLogedIn);
    })();
  }, []);

  const { users } = useSelector((state) => state.reducerUser);
  const { event, stage, error } = useSelector((state) => state.reducerEvent);

  useEffect(() => {
    if (event) {
      if (stage === 'addEvent') {
        if (!error) {
          sendNotify(payload);
          customAlert({
            actionConfirm: () => {
              navigation.replace('EventCalendar');
            },
            title: 'Create Event Success',
            message: `Hi ${userLogin.fullname}, Your Event is created! Your tetonggo will receive a notification in a short notice`,
          });
        }
      }
    }
  }, [event]);

  const handlePayload = (key, value) => {
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    console.log('payload', payload);
    const { name, description, CategoryId, date } = payload;
    payload.date = new Date(date);

    if ((name, description, CategoryId)) {
      dispatch(
        callServerV2({
          url: 'event',
          stage: 'addEvent',
          method: 'post',
          body: payload,
          headers: {
            access_token: userLogin.access_token,
          },
          type: 'SET_EVENT',
        }),
      );
    } else {
      customAlert({
        actionConfirm: () => {},
        title: 'Create Event Failed',
        message: 'Please, Fill all required.\ncategory, name and note is required.',
      });
    }
  };

  const newUser = userLogin ? users.filter((el) => el.RealEstateId === userLogin.RealEstateId) : null;

  const sendNotify = (data) => {
    (async () => {
      const token = [];
      for (let i = 0; i < newUser.length; i++) {
        if (newUser[i].expoPushToken && newUser[i].id !== userLogin.id) {
          if (newUser[i].expoPushToken) {
            token.push(newUser[i].expoPushToken);
          }
        }
      }
      console.log(token);;
      sendNotification(token, data.name, data.description, {
        from: { fullname: userLogin.fullname, userid: userLogin.id },
      });
    })();
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={{ height: 130, marginTop: 20, marginLeft: 20 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={payload.CategoryId === 1 ? styles.button2 : styles.button1}
              onPress={() => setPayload({ ...payload, CategoryId: 1 })}
              disabled={payload.CategoryId === 1}
            >
              <Image
                style={payload.CategoryId === 1 ? styles.image2 : styles.image1}
                source={require('../assets/icon_events/e_pengajian.png')}
              />
              <Text style={payload.CategoryId === 1 ? styles.textBtn2 : styles.textBtn1}>Pengajian</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={payload.CategoryId === 2 ? styles.button2 : styles.button1}
              onPress={() => setPayload({ ...payload, CategoryId: 2 })}
              disabled={payload.CategoryId === 2}
            >
              <Image
                style={payload.CategoryId === 2 ? styles.image2 : styles.image1}
                source={require('../assets/icon_events/e_rapat.png')}
              />
              <Text style={payload.CategoryId === 2 ? styles.textBtn2 : styles.textBtn1}>Arisan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={payload.CategoryId === 3 ? styles.button2 : styles.button1}
              onPress={() => setPayload({ ...payload, CategoryId: 3 })}
              disabled={payload.CategoryId === 3}
            >
              <Image
                style={payload.CategoryId === 3 ? styles.image2 : styles.image1}
                source={require('../assets/icon_events/e_others.png')}
              />
              <Text style={payload.CategoryId === 3 ? styles.textBtn2 : styles.textBtn1}>Others</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <Text style={{ alignSelf: 'flex-start', marginLeft: 30, fontWeight: '600', color: '#666E83', marginTop: 20 }}>
          Title *
        </Text>
        <TextInput
          placeholder="Tetonggo Event"
          placeholderTextColor="black"
          style={{ height: 40, width: 300, backgroundColor: 'white', borderBottomColor: 'black' }}
          onChangeText={(text) => handlePayload('name', text)}
        ></TextInput>

        <Text style={{ alignSelf: 'flex-start', marginLeft: 30, fontWeight: '600', color: '#666E83', marginTop: 20 }}>
          Date *
        </Text>
        <TextInput
          placeholder="Date"
          editable={false}
          value={payload.date}
          placeholderTextColor="black"
          style={{ height: 40, width: 300, backgroundColor: 'white', borderBottomColor: 'black' }}
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
          Add a Note *
        </Text>
        <TextInput
          placeholder="Write a note here"
          style={{ height: 40, width: 300, backgroundColor: 'white', borderBottomColor: 'black' }}
          onChangeText={(text) => handlePayload('description', text)}
        ></TextInput>

        <TouchableOpacity
          style={{ width: 300, height: 40, backgroundColor: '#161C2B', paddingVertical: 10, marginTop: 30 }}
          onPress={() => handleSubmit()}
          // onPress={() => sendNotify()}
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
