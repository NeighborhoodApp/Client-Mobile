import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts, Ubuntu_300Light, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import customAlert from '../helpers/alert';
import { getUserLogedIn, setUserLogedIn } from '../helpers/storange';
import callServerV2 from '../helpers/callServer.v2';
import Loading from '../components/Loading';

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
  const [userLogin, setUserLogin] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await getUserLogedIn();
      setUserLogin(user)
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (userLogin) {
        if (userLogin.hasOwnProperty('access_token')) {
          dispatch(
            callServerV2({
              url: 'real-estates',
              stage: 'getRealEstates',
              type: 'SET_REAL_ESTATES',
            }),
          );
        } else {
          customAlert({
            actionConfirm: () => {
              navigation.replace('Login');
            },
            title: 'Session Expired',
            message: `Please login firts or register!`,
          });
        }
      }
    })();
  }, [userLogin])

  const { realEstates, loading } = useSelector((state) => state.reducerRealEstate);
  const { user, stage, loading: userLoading } = useSelector((state) => state.reducerUser);

  useEffect(() => {
    if (realEstates.length > 0) {
      addItem();
    }
  }, [realEstates]);

  useEffect(() => {
    if (selectedEstates) {
      addComplex(selectedEstates);
    }
  }, [selectedEstates]);

  useEffect(() => {
    if (user && user) {
      if (stage === 'updateUser') {
        // console.log('userrrrr....', user);
        customAlert({
          actionConfirm: () => {
            navigation.replace('Waiting');
          },
          title: 'Register Success',
          message: `Hi, ${user.fullname}, Your account has submited for approval.\nPlease wait until your account is verified!`,
        });
      }
    }
  }, [user])

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

  const prosesApproval = () => {
    if (userLogin.hasOwnProperty('access_token')) {
      const newName = userLogin.fullname.split('#');
      const updatedUser = {
        ...userLogin,
        RealEstateId: selectedEstates,
        ComplexId: selectedComplexes,
        fullname: newName[0],
      };

      const { fullname, address, RoleId, RealEstateId, ComplexId } = updatedUser;
      const payload = { fullname, address, RoleId, RealEstateId, ComplexId };
      
      if (RealEstateId && ComplexId) {
        (async () => {
          dispatch(
            callServerV2({
              url: 'users/' + userLogin.id,
              stage: 'updateUser',
              method: 'PUT',
              body: payload,
              headers: {
                access_token: userLogin.access_token,
              },
              type: 'SET_USER',
            }),
          );
          await setUserLogedIn(updatedUser)
        })();
      } else {
        customAlert({
          actionConfirm: () => { },
          title: 'Register Failed',
          message:
            `Hi, ${updatedUser.fullname}, Please select Real Estate and Complex!`,
        });
      }
    }
  }
  
  if (loading || userLoading || !loaded ) return <Loading />;

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

export default PickLocation;
