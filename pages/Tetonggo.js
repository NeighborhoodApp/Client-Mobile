
import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';

import { Ubuntu_300Light } from '@expo-google-fonts/ubuntu';
import BottomNavigator from '../components/BottomNavigator'
import { useDispatch, useSelector } from 'react-redux';
import callServer from '../helpers/callServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axios } from '../helpers/Axios';
import { FontAwesome5 } from '@expo/vector-icons';

const defaultVal = {
  description: '',
  privacy: 'public',
}

function Tetonggo({ navigation }) {
  useEffect(() => {
    const option = {
      url: 'users',
      stage: 'getRealEstates',
      method: 'get',
      body: null,
      headers: true, // true
      type: 'SET_USERS',
    };
    dispatch(callServer(option));
  }, []);
  
  const { users, user: userNow, error, stage, loading } = useSelector((state) => state.reducerUser);
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState({ user: '', address: '' });
  const [selectedValue, setSelectedValue] = useState('public');
  const [payload, setPayload] = useState(defaultVal);
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();

  let [loaded] = useFonts({
    Poppins_600SemiBold,
    Ubuntu_300Light,
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    let temp
    const tes = async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      const json = JSON.parse(value);
      temp = json.id
      setUser(json);
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 30, borderWidth: 3, borderColor: 'white', borderRadius: 50 }} onPress={() => { navigation.navigate('Menu') }}>
            <Avatar.Image size={39}
              source={{
                uri: `https://randomuser.me/api/portraits/men/${temp ? temp : null}.jpg`,
              }}
            />
          </TouchableOpacity>
        ),
      })
    }
    tes()
  }, [navigation])

  const newUser = user ? users.filter((el) =>
    (el.ComplexId === user.ComplexId && el.status === 'Active')) : null;
  
  if (!loaded) return <AppLoading />;

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.border}></View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.account}>My Tetonggo</Text>
        {!newUser ? null : newUser.map((el, index) => {
          return (
            <View key={`timeline${index}`} style={styles.box}>
              <TouchableOpacity onPress={() => navigation.navigate('Profile', { userId: el.id })}>
                <View style={styles.row}>
                  <Avatar.Image
                    size={39}
                    source={{
                      uri: `https://randomuser.me/api/portraits/men/${el.id}.jpg`,
                    }}
                  />

                  <View style={styles.boxProfile}>
                    <Text style={styles.name}>
                      {el.fullname + ' '}
                      {el.RoleId === 2 && <FontAwesome5 name="crown" size={15} color="orange" style={{ paddingLeft: 13 }} />}
                      
                    </Text>
                    <Text styles={styles.location}>{el.address}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.hr} />
            </View>
          );
        })}
      </ScrollView>
      <BottomNavigator currentPage={'Tetonggo'} navigation={navigation}></BottomNavigator>
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