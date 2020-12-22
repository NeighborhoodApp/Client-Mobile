import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Ubuntu_300Light, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu';
import VerificationList from '../components/VerificationList';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import callServerV2 from '../helpers/callServer.v2';
import { getUserLogedIn } from '../helpers/storange';

function Verification() {
  const [loaded] = useFonts({
    Roboto_700Bold,
    Ubuntu_300Light,
    Ubuntu_500Medium,
  });

  const [userLogin, setUserLogin] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
       (async () => {
         const userLogedIn = await getUserLogedIn();
         setUserLogin(userLogedIn);
       })();
    })();
  }, []);

  useEffect(() => {
    (async => {
      if (userLogin !== null) {
        if (userLogin.hasOwnProperty('access_token')) {
          dispatch(
            callServerV2({
              url: 'users',
              stage: 'getUsers',
              type: 'SET_USERS',
              headers: {
                access_token: userLogin.access_token,
              },
            }),
          );
        }
      }
    })();
  }, [userLogin])

  const { users, loading, stage } = useSelector((state) => state.reducerUser);

  useEffect(() => {
    if (stage === 'declined' || stage === 'confirmed') {
      console.log('User ' + stage)
    }
    if (userLogin) {
      const filterUser = [];
      console.log('Filteredddd', userLogin);
      users.forEach((user) => {
        if (user.ComplexId) {
          if (user.ComplexId === userLogin.ComplexId && user.RoleId !== 2 && user.status === 'Inactive') {
            filterUser.push(user);
          }
        }
      });
      setFilteredUsers(filterUser);
    }
  }, [users]);

  const handleDecline = (user) => {
    (async () => {
      dispatch(
        callServerV2({
          url: `users/${user.id}`,
          stage: 'declined',
          method: 'put',
          body: {
            fullname: `${user.fullname}#declined`,
            address: user.address,
            RoleId: user.RoleId,
            RealEstateId: null,
            ComplexId: null,
          },
          headers: {
            access_token: userLogin.access_token,
          },
          type: 'UPDATE_USER',
          id: user.id,
        }),
      );
    })();
  };

  const handleConfirm = (id) => {
    (async () => {
      dispatch(
        callServerV2({
          url: `users/${id}`,
          stage: 'confirmed',
          method: 'patch',
          body: {
            status: 'Active',
          },
          headers: {
            access_token: userLogin.access_token,
          },
          type: 'UPDATE_USER',
          id: id,
        }),
      );
    })();
  };

  // const filteredUsers = users.filter(
  //   (user) => user.ComplexId && user.ComplexId === userLogin.ComplexId && user.RoleId !== 2 && user.status === 'Inactive',
  // );

  if (loading || !loaded) return <Loading />;

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.items}>
          <Text style={styles.title}> New Users </Text>
          {filteredUsers.map((user) => (
            <VerificationList user={user} key={user.id} handleDecline={handleDecline} handleConfirm={handleConfirm} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  bg: {
    position: 'absolute',
    backgroundColor: '#161C2B',
    width: '100%',
    height: '100%',
    top: 0,
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
