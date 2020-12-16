import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import { Ubuntu_300Light } from '@expo-google-fonts/ubuntu';
import BottomNavigator from '../components/BottomNavigator';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import callServer from '../helpers/callServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const defaultVal = {
  description: '',
  privacy: 'public',
};

function Discover({ navigation }) {
  const { timelines, error, stage } = useSelector((state) => state.reducerTimeline);
  const [user, setUser] = useState(null);
  const [selectedValue, setSelectedValue] = useState('public');
  const [payload, setPayload] = useState(defaultVal);
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();

  let [loaded] = useFonts({
    Poppins_600SemiBold,
    Ubuntu_300Light,
  });
  // >>>>>>>>> IMAGE PICKER <<<<<<<<<<<<<
  const [image, setImage] = useState(null);

  // >>>>>>>>> HEADER OPTIONS <<<<<<<<<<<<<

  const fetchTimeline = () => {
    const option = {
      url: 'timeline',
      stage: 'getTimelines',
      method: 'get',
      body: null,
      headers: true,
      type: 'SET_TIMELINES',
    };
    dispatch(callServer(option));
  };

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
          <Avatar.Image
            size={48}
            source={{ uri: 'https://i.pinimg.com/474x/73/c3/e7/73c3e7cca66a885c53718d8f3688b02c.jpg' }}
          />
        </TouchableOpacity>
      ),
    });
    fetchTimeline();
  }, [navigation]);

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

      setFormData(data);
    }
  };

  const submitHandler = async () => {
    console.log('press');
    let uri;
    try {
      if (payload.description && formData) {
        console.log(formData);
        const { data } = await axios({
          method: 'post',
          url: 'http://192.168.1.12:3000/upload',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        uri = data;
      }

      if (payload.description) {
        await axios({
          method: 'post',
          url: 'http://192.168.1.12:3000/timeline',
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

  if (!loaded) return <AppLoading />;
  if (!timelines.length || !user) return <Text>Loading</Text>;

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.boxAwal}>
          <View style={styles.row}>
            <Avatar.Image
              size={39}
              style={{ marginTop: 5 }}
              source={{
                uri:
                  'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/07/black-men-haircuts-afro-natural-hair-683x1024.jpg',
              }}
            />
            <View style={styles.boxProfile}>
              <Text style={styles.name}>{user.fullname}</Text>
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
                  onChangeItem={(item) => handleInput(item.value, 'privacy')}
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
          return (
            <View key={`timeline${index}`} style={styles.box}>
              <View style={styles.hr} />
              <View style={styles.row}>
                <Avatar.Image
                  size={39}
                  source={{
                    uri:
                      'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/07/black-men-haircuts-afro-natural-hair-683x1024.jpg',
                  }}
                />
                <View style={styles.boxProfile}>
                  <Text style={styles.name}>{el.User.fullname}</Text>
                  <Text styles={styles.location}>{el.User.Complex.name}</Text>
                </View>
              </View>
              <View style={styles.hr} />
              <View style={styles.boxCard}>
                <View style={styles.boxText}>
                  <Text style={styles.status}>{el.description}</Text>
                </View>
                {el.image !== '' && (
                  <Card style={styles.card}>
                    <Card.Cover source={{ uri: el.image }} />
                  </Card>
                )}

                <Text style={styles.status}>
                  <FontAwesome name="comment" size={20} color="black" /> {el.Comments.length}
                </Text>
              </View>
              <View style={styles.hr} />
            </View>
          );
        })}
      </ScrollView>
      <BottomNavigator submitHandler={submitHandler}></BottomNavigator>
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
    width: '100%',
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

export default Discover;
