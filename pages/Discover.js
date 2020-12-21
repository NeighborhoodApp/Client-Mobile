import React, { useEffect, useState, useCallback } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Loading from '../components/Loading';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import { Ubuntu_300Light } from '@expo-google-fonts/ubuntu';
import BottomNavigator from '../components/BottomNavigator';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../helpers/Axios';
import callServerV2 from '../helpers/callServer.v2';
import { actionRemoveTimeline } from '../store/actions/action';
import { getUserLogedIn } from '../helpers/storange';
import AppLoading from 'expo-app-loading';

const defaultVal = {
  description: '',
  privacy: 'public',
};

function Discover({ navigation }) {
  const [selectedValue, setSelectedValue] = useState('public');
  const [payload, setPayload] = useState(defaultVal);
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  let [loaded] = useFonts({
    Poppins_600SemiBold,
    Ubuntu_300Light,
  });

  const [image, setImage] = useState(null);
  const [userLogin, setUserLogin] = useState(null);
  const [imgbUri, setImgbUri] = useState(null);

  // >>>>>>>>> HEADER OPTIONS <<<<<<<<<<<<<

  useEffect(() => {
    (async () => {
      console.log('-----UseEffect 1');
      const userLogedIn = await getUserLogedIn();
      setUserLogin(userLogedIn);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (userLogin) {
        console.log('-----UseEffect 2');
        if (userLogin.access_token && userLogin.coordinate) {
          setupUpOption();
          fetchTimeline();
        } else {
          console.log('Session Expired');
          navigation.replace('Login');
        }
      }
    })();
  }, [userLogin]);

  const { timelines, newTimeline } = useSelector((state) => state.reducerTimeline);

  useEffect(() => {
    (async () => {
      if (imgbUri || imgbUri === 'noimage') {
        dispatch(
          callServerV2({
            url: 'timeline',
            method: 'post',
            body: {
              description: payload.description,
              privacy: payload.privacy,
              image: imgbUri === 'noimage' ? '' : imgbUri,
            },
            headers: {
              access_token: userLogin.access_token,
            },
            type: 'CREATE_TIMELINE',
          }),
        );
        setImgbUri(null);
      }
    })();
  }, [imgbUri]);

  useEffect(() => {
    (async () => {
      if (newTimeline) {
        fetchTimeline();
        dispatch(actionRemoveTimeline());
      }
    })();
  }, [newTimeline]);

  useEffect(() => {
    (async () => {
      if (timelines.length > 0) {
        // Take some action
      }
    })();
  }, [timelines]);

  const fetchTimeline = (token, coordinate) => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
      dispatch(
        callServerV2({
          url: 'timeline',
          stage: 'getTimelines',
          headers: {
            access_token: userLogin ? userLogin.access_token : token,
            coordinate: userLogin ? userLogin.coordinate : coordinate,
          },
          type: 'SET_TIMELINES',
        }),
      );
    })();
  };

  const setupUpOption = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 30, borderWidth: 3, borderColor: 'white', borderRadius: 50 }}
          onPress={() => {
            navigation.navigate('Menu');
          }}
        >
          <Avatar.Image
            size={39}
            source={{
              uri: `https://randomuser.me/api/portraits/men/${userLogin.id}.jpg`,
            }}
          />
        </TouchableOpacity>
      ),
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      let localUri = result.uri;
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      const data = new FormData();
      data.append('file', { uri: localUri, name: filename, type });

      data.append('file', result.uri);
      setImgbUri(null);
      setFormData(data);
    }
  };

  const submitHandler = async () => {
    try {
      if (payload.description && formData) {
        setLoading(true);
        const { data } = await axios({
          url: 'upload',
          method: 'post',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setImgbUri(data);
      } else if (payload.description) {
        setLoading(true);
        setImgbUri('noimage');
      }

      setTimeout(() => {
        setLoading(false);
        setImage(null);
        setFormData(null);
        setPayload({ description: '', privacy: 'public' });
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (text, name) => {
    if (name === 'privacy' && !text) {
      text = 'public';
    }
    const value = {
      ...payload,
      [name]: text,
    };
    setPayload(value);
  };

  const changePage = (id) => {
    navigation.navigate('Comment', {
      id,
    });
  };

  const deleteTl = async (id) => {
    try {
      await axios({
        url: `timeline/${id}`,
        method: 'delete',
        headers: {
          access_token: userLogin.access_token,
        },
      });
      fetchTimeline();
    } catch (error) {
      console.log(error);
    }
  };

  const longPres = (id) => {
    Alert.alert(
      'Delete timeline',
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => deleteTl(id) },
      ],
      { cancelable: false },
    );
  };

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      if (!userLogin) {
        const userLogedIn = await getUserLogedIn();
        await fetchTimeline(userLogedIn.access_token, userLogedIn.coordinate);
      } else {
        await fetchTimeline();
      }
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!loaded || !userLogin) return <AppLoading />;
  if (loading) return <Loading />;
  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.bg1}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View style={styles.boxAwal}>
            <View style={styles.row}>
              <Avatar.Image
                size={39}
                style={{ marginTop: 5 }}
                source={{
                  uri: `https://randomuser.me/api/portraits/men/${userLogin.id}.jpg`,
                }}
              />
              <View style={styles.boxProfile}>
                <Text style={styles.name}>{userLogin.fullname}</Text>
                <Text style={styles.location}>{userLogin.RealEstate.name}</Text>

                <View style={{ flexDirection: 'row', width: '60%' }}>
                  <DropDownPicker
                    items={[
                      { label: 'Public', value: 'public', hidden: true },
                      { label: 'Tetonggo', value: 'member' },
                    ]}
                    defaultValue={selectedValue}
                    containerStyle={{ height: 29, width: '70%', alignSelf: 'flex-start', marginTop: 4 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                      justifyContent: 'flex-start',
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={(item) => {
                      setSelectedValue(item.value);
                      handleInput(item.value, 'privacy');
                    }}
                    labelStyle={{
                      fontSize: 13,
                      textAlign: 'left',
                      color: '#000',
                    }}
                  />
                  {/* >>>>>>>>> IMAGE PICKER <<<<<<<<<<<<< */}
                  <TouchableOpacity onPress={pickImage}>
                    <Text style={styles.addPhotos}>
                      <MaterialIcons name="add-a-photo" size={14} color="#707070" /> Photo
                    </Text>
                  </TouchableOpacity>
                  {/* >>>>>>>>> IMAGE PICKER <<<<<<<<<<<<< */}
                </View>
              </View>
            </View>
            <View style={styles.boxCard}>
              {image && (
                <Card style={styles.cardStatus}>
                  <Card.Cover source={{ uri: image }} />
                </Card>
              )}
              <View style={styles.boxStatus}>
                <TextInput
                  multiline
                  defaultValue={payload.description}
                  onChangeText={(text) => handleInput(text, 'description')}
                  style={styles.inputStatus}
                  placeholder="What’s on your mind?"
                  placeholderTextColor="white"
                />
              </View>
            </View>
          </View>
          {timelines.map((el, index) => {
            if (el.privacy === 'public' || el.User.RealEstateId === userLogin.RealEstateId) {
              return (
                <View key={`timeline${index}`} style={styles.box}>
                  <View style={styles.hr} />
                  <View style={styles.row}>
                    <Avatar.Image
                      size={39}
                      style={{ marginTop: 5 }}
                      source={{
                        uri: `https://randomuser.me/api/portraits/men/${el.UserId}.jpg`,
                      }}
                    />
                    <View style={styles.boxProfile}>
                      {el.UserId === userLogin.id ? (
                        <TouchableOpacity onLongPress={() => longPres(el.id)}>
                          <Text style={styles.name}>{el.User.fullname}</Text>
                        </TouchableOpacity>
                      ) : (
                        <Text style={styles.name}>{el.User.fullname}</Text>
                      )}
                      <Text styles={styles.location}>{el.User.RealEstate.name}</Text>
                    </View>
                    <FontAwesome
                      name={el.privacy === 'public' ? 'globe' : 'users'}
                      size={25}
                      color="#161C2B"
                      style={{ alignSelf: 'center', marginLeft: 165 }}
                    />
                  </View>
                  <View style={styles.hr} />
                  <View style={styles.boxCard}>
                    <View style={styles.boxText}>
                      <Text style={styles.status}>{el.description}</Text>
                    </View>
                    {el.image ? (
                      <Card style={styles.card}>
                        <Card.Cover source={{ uri: el.image }} />
                      </Card>
                    ) : null}
                    <TouchableOpacity onPress={() => changePage(el.id)}>
                      <Text style={styles.status}>
                        <FontAwesome name="comment" size={20} color="black" /> {el.Comments.length}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.hr} />
                </View>
              );
            }
          })}
        </ScrollView>
        <BottomNavigator currentPage="Home" navigation={navigation} submitHandler={submitHandler}></BottomNavigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    backgroundColor: '#161C2B',
    width: '100%',
    height: '100%',
    top: 0,
  },
  bg1: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    top: 0,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 30,
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
    zIndex: -1,
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
    // zIndex: -999,
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

export default Discover;
