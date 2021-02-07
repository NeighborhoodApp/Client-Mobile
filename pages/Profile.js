import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useFonts, Ubuntu_300Light, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { FontAwesome, Fontisto, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { getUserLogedIn } from '../helpers/storange';
import Loading from '../components/Loading';

function Profile({ route }) {
  const [loaded] = useFonts({
    Ubuntu_300Light,
    Montserrat_600SemiBold,
    Ubuntu_500Medium,
  });

  const [userLogin, setUserLogin] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    (async () => {
      const userLogedIn = await getUserLogedIn();
      setUserLogin(userLogedIn);
    })();
  }, [])

  const { users } = useSelector((state) => state.reducerUser);

  useEffect(() => {
    (async () => {
      if (userLogin) {
        const userId = route.params ? route.params.userId : userLogin.id;
        const userSelect = users.filter((el) => el.id === userId);
        setSelectedUser(userSelect[0]);
      }
    })();
  }, [userLogin]);

  if (!selectedUser || !loaded) return <Loading />;
  
  return (
    <View style={styles.bg}>
      <View style={styles.container}>
        {/* >>>>>> PROFILE PAGE <<<<<<< */}
        <View style={styles.images}>
          <Avatar.Image
            size={100}
            source={{
              uri: `https://randomuser.me/api/portraits/men/${selectedUser.id}.jpg`,
            }}
          />
        </View>
        <View style={styles.box}>
          <View stle={styles.bg}></View>
          <View style={styles.input}>
            <FontAwesome name="user" size={20} color="white" style={{ marginRight: 5 }} />
            <Text style={styles.Textinput}> {selectedUser.fullname}</Text>
          </View>
          <View style={styles.hr} />
          <View style={styles.input}>
            <Fontisto name="email" size={20} color="white" style={{ marginLeft: 0 }} />
            <Text style={styles.Textinput}> {selectedUser.email}</Text>
          </View>
          <View style={styles.hr} />
          <View style={styles.input}>
            <Entypo name="location" size={20} color="white" style={{ marginLeft: 0 }} />
            <Text style={styles.Textinput}> {selectedUser.address}</Text>
          </View>
          <View style={styles.hr} />
          <View style={styles.input}>
            <FontAwesome name="building" size={20} color="white" style={{ marginRight: 5 }} />
            <Text style={styles.Textinput}> {selectedUser.RealEstate.name}</Text>
          </View>

          <View style={styles.hr} />
          <View style={styles.input}>
            <FontAwesome name="home" size={20} color="white" style={{ marginRight: 5 }} />
            <Text style={styles.Textinput}> {selectedUser.Complex.name}</Text>
          </View>
          {/* >>>>>> FEES PAGE <<<<<<< */}
          {/* <View style={styles.input}>
          <FontAwesome name="pencil-square-o" size={20} color="white" style={{ marginLeft: 6 }} />
          <TextInput style={styles.Textinput} placeholder="Title" placeholderTextColor="#FFF" readOnly />
        </View>
        <View style={styles.hr} />
        <View style={styles.input}>
          <FontAwesome5 name="search-dollar" size={20} color="white" style={{ marginLeft: 6 }} />
          <TextInput style={styles.Textinput} placeholder="Fees" placeholderTextColor="#FFF" readOnly />
        </View>
        <View style={styles.hr} />
        <View style={styles.input}>
          <AntDesign name="clockcircle" size={19} color="white" style={{ marginLeft: 6 }} />
          <TextInput style={styles.Textinput} placeholder="Due Date " placeholderTextColor="#FFF" readOnly />
        </View>
        <View style={styles.hr} /> */}
          {/* >>>>>> BUTTON FOR CREATE FEES <<<<<<< */}
          {/* <TouchableOpacity style={styles.btn}>
          <Text style={styles.submit} onPress={toNotification}>
            {' '}
            SUBMIT{' '}
          </Text>
        </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    backgroundColor: '#161C2B',
    width: '100%',
    height: '100%',
    top: 0
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  images: {
    top: 0,
    marginTop: 25,
    marginBottom: 20,
    position: 'absolute',
  },
  input: {
    marginTop: 10,
    textAlign: 'left',
    alignSelf: 'stretch',
    marginLeft: 40,
    flexDirection: 'row',
    backgroundColor: '#161C2B',
  },
  box: {
    backgroundColor: '#161C2B',
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
    paddingVertical: 14,
    position: 'absolute',
    top: 100,
    borderRadius: 20
  },
  Textinput: {
    height: 25,
    fontFamily: 'Ubuntu_300Light',
    color: 'white',
    marginLeft: 10,
    fontSize: 15,
    marginBottom: 4,
  },
  hr: {
    borderBottomColor: '#A2A2A2',
    borderBottomWidth: 0.6,
    width: '80%',
    marginBottom: 4,
  },
  btn: {
    elevation: 8,
    backgroundColor: '#2FBBF0',
    borderRadius: 6,
    paddingVertical: 18,
    width: '70%',
    marginTop: 20,
  },
  submit: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
});

export default Profile;
