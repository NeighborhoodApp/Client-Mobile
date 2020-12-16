import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useFonts, Ubuntu_300Light, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import AppLoading from 'expo-app-loading';
import { useDispatch, useSelector } from 'react-redux';
import callServer from '../helpers/callServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cos } from 'react-native-reanimated';
import errorHandler from '../helpers/errorHandler';
import { axios } from '../helpers/Axios';
import customAlert from '../helpers/alert';
import { actionRemoveRealEstate } from '../store/actions/action';

let i = 1;
const defaultVal = [
  { label: ' Riyan', value: 'usa', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true },
  { label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" /> },
  { label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" /> },
];

let isLoaded = false;
let render = 1;
function PickLocation({ navigation }) {
  let [loaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    Montserrat_500Medium,
  });

  const dispatch = useDispatch();

  const [selectedEstates, setSelectedEstates] = useState(null);
  const [selectedComplexes, setSelectedComplexes] = useState(null);
  const [items, setItems] = useState([]);
  const [itemsComplexs, setItemsComplexs] = useState([]);
  const [userLogedIn, setUserLogedIn] = useState(null);

  const { realEstates, error, stage } = useSelector((state) => state.reducerRealEstate);
  const { result, error: errUser, stage: stageUser } = useSelector((state) => state.reducerUser);

  useEffect(() => {
    const load = async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      const json = JSON.parse(value);
      setUserLogedIn(json);
      dispatch(actionRemoveRealEstate())
      fetchRealEstate();
    }
    load();
  }, []);

  useEffect(() => {
    if (selectedEstates) {
      addComplex(selectedEstates);
    }
  }, [selectedEstates]);

  useEffect(() => {
    if (realEstates) {
      addItem();
    }
  }, [realEstates]);

  const fetchRealEstate = () => {
    const option = {
      url: 'real-estates',
      stage: 'getRealEstates',
      method: 'get',
      body: null,
      headers: null, // true
      type: 'SET_REAL_ESTATES',
    };
    dispatch(callServer(option));
  };

  const addItem = () => {
    const activeEstates = [];
    realEstates.forEach((el) => {
      if (el.status === 'Active')
        activeEstates.push({
          label: el.name,
          value: el.id,
          icon: () => <Icon name="flag" size={18} color="#900" />,
        });
    });
    setItems(activeEstates);
  };

  const addComplex = (id) => {
    if (id && typeof id === 'number') {
      const activeComplexs = [];
      const [currentComplex] = realEstates.filter((el) => el.id === id);
      currentComplex.Complexes.forEach((el) => {
        if (el.status === 'Active')
          activeComplexs.push({
            label: el.name,
            value: el.id,
            icon: () => <Icon name="flag" size={18} color="#900" />,
          });
      });
      setSelectedComplexes(null);
      setItemsComplexs(activeComplexs);
    }
  };

  const prosesApproval = async () => {
    if (userLogedIn) {
      const newName = userLogedIn.fullname.split('#');
      const updatedUser = {
        ...userLogedIn,
        RealEstateId: selectedEstates,
        ComplexId: selectedComplexes,
        fullname: newName[0],
      };
      const { fullname, address, RoleId, RealEstateId, ComplexId } = updatedUser;
      const payload = { fullname: newName[0], address, RoleId, RealEstateId, ComplexId };
      console.log(RealEstateId, ComplexId, 'RealEstateId && ComplexId');
      if (RealEstateId && ComplexId) {
        console.log('payload', payload);
        try {
          await axios({
            url: 'users/' + userLogedIn.id,
            method: 'PUT',
            data: payload,
            headers: {
              access_token: userLogedIn.access_token,
            },
          });
          const jsonValue = JSON.stringify(updatedUser);
          await AsyncStorage.setItem('userlogedin', jsonValue);
          Alert.alert(
            'Register Success',
            `Hi, ${updatedUser.fullname}, Your account has submited for approval.\nPlease wait until your account is verified!`,
            [
              // { text: "Don't leave", style: 'cancel', onPress: () => {} },
              {
                text: 'Ok',
                style: 'destructive',
                onPress: () => navigation.replace('Waiting'),
              },
            ],
          );
        } catch (error) {
          const msg = errorHandler(error);
          console.log(msg);
        }
      } else {
        Alert.alert('Register Failed', `Hi, ${updatedUser.fullname}, Please select Real Estate and Complex!`, [
          // { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Ok',
            style: 'destructive',
            // onPress: () => navigation.replace('Waiting'),
          },
        ]);
      }
    } else {
       Alert.alert('Please Login', `Please login firts or register!`, [
         // { text: "Don't leave", style: 'cancel', onPress: () => {} },
         {
           text: 'Ok',
           style: 'destructive',
           onPress: () => navigation.replace('Login'),
         },
       ]);
    }
  }
      
  // console.log(render, stageUser, errUser, result);

  const handleChange = (itemValue) => {
    setSelectedEstates(itemValue);
  };
  
  if (!loaded) return <AppLoading />;

  return (
    <View style={styles.container}>
      <Image style={styles.house} source={require('../assets/house.gif')} />

      <TouchableOpacity onPress={() => prosesApproval()} style={styles.btn}>
        <Text style={styles.btn_Text}> SUBMIT </Text>
      </TouchableOpacity>
      <View style={styles.box}>
        <Text style={styles.firstLine}> Pick Real Estate </Text>
        {items.length < 0 ? null : (
          <DropDownPicker
            items={items}
            searchable={true}
            searchablePlaceholder="Search for an item"
            defaultValue={selectedEstates}
            containerStyle={{ height: 40, width: '80%', justifyContent: 'center', alignSelf: 'center' }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            // onValueChange={(itemValue, itemIndex) => handleChange(itemValue)}
            onChangeItem={(item) => setSelectedEstates(item.value)}
          />
        )}

        <Text style={styles.firstLine}> Complex </Text>
        <DropDownPicker
          items={itemsComplexs}
          searchable={true}
          searchablePlaceholder="Search for an item"
          defaultValue={selectedComplexes}
          containerStyle={{ height: 40, width: '80%', justifyContent: 'center', alignSelf: 'center' }}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          // onValueChange={(itemValue, itemIndex) => setSelectedEstates(itemValue)}
          onChangeItem={(item) => setSelectedComplexes(item.value)}
        />
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
  house: {
    width: 450,
    height: 360,
    alignSelf: 'flex-start',
    marginLeft: -30,
    position: 'absolute',
    bottom: 80,
    // marginTop: 90
  },
  box: {
    position: 'absolute',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    // marginTop:-15,
    backgroundColor: '#161C2B',
    paddingVertical: '20%',
    width: '100%',
    height: '60%',
    top: 0,
  },
  footer: {
    backgroundColor: '#161C2B',
    position: 'absolute',
    alignSelf: 'flex-end',
    position: 'absolute',
    height: '10%',
    width: '100%',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstLine: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  secondLine: {
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
    bottom: 0,
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
  btn: {
    alignSelf: 'center',
    marginLeft: -30,
    position: 'absolute',
    bottom: 30,
    elevation: 8,
    backgroundColor: '#5CB409',
    borderRadius: 6,
    paddingVertical: 14,
    width: '70%',
    marginTop: 40,
    zIndex: 999,
  },
  btn_Text: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
});

export default PickLocation
