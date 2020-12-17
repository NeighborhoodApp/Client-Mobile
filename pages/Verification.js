import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Ubuntu_300Light, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu';
import AppLoading from 'expo-app-loading';
import VerificationList from '../components/VerificationList';
import { useDispatch, useSelector } from 'react-redux';
import callServer from '../helpers/callServer';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Verification() {
  const [loaded] = useFonts({
    Roboto_700Bold,
    Ubuntu_300Light,
    Ubuntu_500Medium,
  });

  const [admin, setAdmin] = useState({});
  const { users, loading, stage, error } = useSelector((state) => state.reducerUser);

  const filteredUsers = users.filter(
    (user) => user.ComplexId === admin.ComplexId && user.RoleId !== 2 && user.status === 'Inactive',
  );

  const dispatch = useDispatch();

  const handleDecline = (user) => {
    const updateUser = (user) => {
      const option = {
        url: `users/${user.id}`,
        stage: 'updateUser',
        method: 'put',
        body: {
          fullname: `${user.fullname}#declined`,
          address: user.address,
          RoleId: user.RoleId,
          RealEstateId: null,
          ComplexId: null,
        },
        headers: true,
        type: 'UPDATE_USER',
        id: user.id,
      };
      dispatch(callServer(option));
    };
    updateUser(user);
  };

  const handleConfirm = (id) => {
    const updateUser = (id) => {
      const option = {
        url: `users/${id}`,
        stage: 'updateUser',
        method: 'patch',
        body: {
          status: 'Active',
        },
        headers: true,
        type: 'UPDATE_USER',
        id: id,
      };
      dispatch(callServer(option));
    };
    updateUser(id);
  };

  useEffect(() => {
    const fetchUsers = () => {
      const option = {
        url: 'users',
        stage: 'getUsers',
        method: 'get',
        body: null,
        headers: null,
        type: 'SET_USERS',
      };
      dispatch(callServer(option));
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      const json = JSON.parse(value);
      setAdmin(json);
    };
    getUser();
  }, []);

  if (!loaded) return <AppLoading />;
  else if (loading) return <AppLoading />;
  else {
    return (
      <View style={styles.container}>
        <View style={styles.items}>
          <Text style={styles.title}> New Users </Text>
          {filteredUsers.map((user) => (
            <VerificationList user={user} key={user.id} handleDecline={handleDecline} handleConfirm={handleConfirm} />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between',
  },
  items: {
    position: 'absolute',
    top: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
  },
  column: {
    flexDirection: 'column',
  },
  name: {
    fontFamily: 'Roboto_700Bold',
    fontWeight: 'bold',
    marginLeft: 20,
    fontSize: 16,
  },
  address: {
    fontFamily: 'Ubuntu_300Light',
    marginLeft: 20,
    fontSize: 13,
  },
  size: {
    fontSize: 10,
  },
  btn_confirm: {
    elevation: 8,
    backgroundColor: '#5CB409',
    borderRadius: 6,
    marginTop: 5,
    marginLeft: 2,
    width: 60,
    height: 30,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_delete: {
    elevation: 8,
    backgroundColor: '#fff',
    borderColor: '#161C2B',
    borderWidth: 0.3,
    borderRadius: 6,
    marginTop: 5,
    marginLeft: 2,
    width: 60,
    height: 30,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirm: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delete: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 12,
    color: '#161C2B',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 25,
  },
});

export default Verification;
