
import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, Picker, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';

// import { registerPushNotification } from '../helpers/PushNotification';
// import { verifyUser } from '../helpers/verify';
import { Ubuntu_300Light } from '@expo-google-fonts/ubuntu';
import BottomNavigator from '../components/BottomNavigator'
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import callServer from '../helpers/callServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axios} from '../helpers/Axios'
import SvgUri from 'expo-svg-uri';

const defaultVal = {
  description: '',
  privacy: 'public',
}

function Tetonggo({ navigation }) {
  const { users, user: userNow, error, stage, loading } = useSelector((state) => state.reducerUser);
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState({  user: '', address: ''  });
  const [selectedValue, setSelectedValue] = useState('public');
  const [payload, setPayload] = useState(defaultVal);
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();

  let [loaded] = useFonts({
    Poppins_600SemiBold,
    Ubuntu_300Light,
  });

  const [image, setImage] = useState(null);

  // const fetchTimeline = () => {
  //   const option = {
  //     url: 'timeline',
  //     stage: 'getTimelines',
  //     method: 'get',
  //     body: null,
  //     headers: true,
  //     type: 'SET_TIMELINES',
  //   };
  //   dispatch(callServer(option));
  // };

  console.log(users);
  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      const json = JSON.parse(value);
      setUser(json);

      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 30, borderWidth: 3, borderColor: 'white', borderRadius: 50 }}
          onPress={() => {
            navigation.navigate('Menu');
          }}
        >
          <SvgUri
            width="35"
            height="35"
            source={{ uri: `https://avatars.dicebear.com/api/human/:${user ? user.fullname : 'random'}.svg` }}
          />
        </TouchableOpacity>
      ),
    });
    // fetchTimeline()
    return () => {
      dispatch({
        type: 'UNMOUNT_TIMELINES',
      });
    };
  }, [navigation]);

  const submitHandler = async () => {
    console.log('press');
    let uri;
    try {
      if (payload.description && formData) {
        console.log(formData);
        const { data } = await axios({
          url: 'upload',
          method: 'post',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        uri = data;
      }
      if (payload.description) {
        await axios({
          url: 'timeline',
          method: 'post',
          data: {
            description: payload.description,
            image: uri,
            privacy: payload.privacy,
          },
          headers: {
            access_token: user.access_token,
          },
        });
      }
      fetchTimeline();
      setImage(null);
      setFormData(null);
      setPayload({ description: '', privacy: 'public' });
    } catch (error) {
      console.log(error);
    }
  };

  const newUser = user ? users.filter((el) =>
    (el.ComplexId === user.ComplexId && el.status === 'Active')) : null;
  // useEffect(() => {
  //   if (user) {
  //     setSelectedUser(newUser);;
  //   }
  // }, [userNow]);;

  const changePage = (id) => {
    navigation.navigate('Comment', {
      id,
    });
  };

  const data = [
    {
      fullname: 'Riyan',
      address: 'Palembang',
    },
    {
      fullname: 'Moulia',
      address: 'Palembang',
    },
    {
      fullname: 'Ahmad',
      address: 'Palembang',
    },
    {
      fullname: 'Habibi',
      address: 'Palembang',
    },
  ];
  console.log(user, 'userrrr.....');;
  if (!loaded) return <AppLoading />;
  // if (loading) return <AppLoading />;

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.border}></View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.account}>Account</Text>
        { !newUser ? null : newUser.map((el, index) => {
          return (
            <View key={`timeline${index}`} style={styles.box}>
              <View style={styles.row}>
                <SvgUri
                  width="55"
                  height="55"
                  source={{ uri: `https://avatars.dicebear.com/api/avataaars/:${el.fullname}.svg?mood[]=happy` }}
                />
                
                <View style={styles.boxProfile}>
                  <Text style={styles.name}>{el.fullname}</Text>
                  <Text styles={styles.location}>{el.address}</Text>
                </View>
              </View>
              <View style={styles.hr} />
            </View>
          );
        })}
      </ScrollView>
      <BottomNavigator currentPage={'Tetonggo'} navigation={navigation} submitHandler={submitHandler}></BottomNavigator>
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
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 50,
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
    width: '100%',
    marginLeft: '15%',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '1%',
  },
  boxProfile: {
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
    width: '86%',
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


export default Tetonggo