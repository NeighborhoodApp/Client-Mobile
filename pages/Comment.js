import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { Avatar } from 'react-native-paper';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import { Ubuntu_300Light } from '@expo-google-fonts/ubuntu';
import { useDispatch, useSelector } from 'react-redux';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import callServer from '../helpers/callServer';
import BottomNavigator from '../components/BottomNavigator'
import { axios } from '../helpers/Axios'
import Loading from '../components/Loading'
import { socket } from '../helpers/socket'
import SvgUri from 'expo-svg-uri';

function Discover({ route, navigation }) {
  const { comments, error, stage } = useSelector((state) => state.reducerComment);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [com, setCom] = useState([])
  const [state, setState] = useState('')
  const { id } = route.params
  let [loaded] = useFonts({
    Poppins_600SemiBold, Ubuntu_300Light
  });

  const fetchComment = () => {
    const option = {
      url: `timeline/${id}`,
      stage: 'getComments',
      method: 'get',
      body: null,
      headers: true,
      type: 'SET_COMMENTS',
    };
    dispatch(callServer(option));
  };

  // >>>>>>>>> HEADER OPTIONS <<<<<<<<<<<<<
  useEffect(() => {
    setLoading(true)
    const tes = async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      const json = JSON.parse(value);
      setUser(json);
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 30, borderWidth: 3, borderColor: 'white', borderRadius: 50 }} onPress={() => { navigation.navigate('Menu') }}>
            <SvgUri
              width="35"
              height="35"
              source={{ uri: `https://avatars.dicebear.com/api/human/:${user ? user.fullname : 'random'}.svg` }}
            />
          </TouchableOpacity>
        ),
      })
      fetchComment()
    }
    tes()

    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [navigation])

  useEffect(() => {
    socket.emit('join', id);

    socket.on('comment', ({ comment, name }) => {
      setCom([...com, { comment, name }])
    })
    return () => {
      socket.emit('dc', id)
      console.log('out')
      const option = {
        url: 'timeline',
        stage: 'getTimelines',
        method: 'get',
        body: null,
        headers: true,
        type: 'SET_TIMELINES',
      };
      dispatch(callServer(option));
    }
  }, [com])

  const inputHandler = (e) => {
    setState(e)
  }

  const submitHandler = async () => {
    await axios({
      method: 'post',
      url: `comment/${id}`,
      data: {
        comment: state
      },
      headers: {
        access_token: user.access_token
      }
    })
    socket.emit('new comment', { comment: state, id: id, name: user.fullname });
    setState('')
  }

  const deleteCm = async (idc) => {
    try {
      await axios({
        url: `comment/${id}/${idc}`,
        method: 'delete',
        headers: {
          access_token: user.access_token
        }
      })
      fetchComment()
    } catch (error) {
      console.log(error)
    }

  }

  const longPres = (id) => {
    Alert.alert(
      '',
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => deleteCm(id) }
      ],
      { cancelable: false }
    )
  }

  if (loading) return <Loading />
  if (!loaded || !stage) return <AppLoading />;

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.bg1}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {/* >>>>>>>>>>>>> BATAS SUCI <<<<<<<<<<<<< */}
          <View style={styles.box}>
            <View style={styles.row}>
              <SvgUri
                width="55"
                height="55"
                source={{ uri: `https://avatars.dicebear.com/api/human/:${comments.User.fullname}.svg` }}
              />
              <View style={styles.boxProfile}>
                <Text style={styles.name}>{comments.User.fullname}</Text>
                <Text styles={styles.location}>{comments.User.address}</Text>
              </View>
            </View>
            <View style={styles.hr} />
            <View style={styles.boxCard}>
              <View style={styles.boxText}>
                <Text style={styles.status}>{comments.description}</Text>
              </View>
              {
                comments.image &&
                <Card style={styles.card}>
                  <Card.Cover source={{ uri: comments.image }} />
                </Card>
              }
              <Text style={styles.status}><FontAwesome name="comment" size={20} color="black" /> {comments.Comments.length}</Text>
            </View>
            <View style={styles.hr} />
          </View>
          {/* INI COMMENT */}
          {
            comments.Comments.map((el, index) => {
              return (
                <View key={`comment${index}`} style={styles.rowComment}>
                  <SvgUri
                    width="35"
                    height="35"
                    source={{ uri: `https://avatars.dicebear.com/api/human/:${el.User.fullname}.svg` }}
                  />
                  <View style={styles.boxProfile}>
                    {
                      (el.UserId === user.id) ?
                        <TouchableOpacity onLongPress={() => longPres(el.id)}>
                          <Text style={styles.nameComment}>{el.User.fullname}</Text>
                        </TouchableOpacity> :
                        <Text style={styles.nameComment}>{el.User.fullname}</Text>
                    }
                    <Text style={styles.comment}>{el.comment}</Text>
                  </View>
                </View>
              )
            })
          }
          {
            com.length > 0 &&
            com.map((el, index) => {
              return (
                <View key={`commentNew${index}`} style={styles.rowComment}>
                  <SvgUri
                    width="35"
                    height="35"
                    source={{ uri: `https://avatars.dicebear.com/api/human/:${el.name}.svg` }}
                  />
                  <View style={styles.boxProfile}>
                    <Text style={styles.nameComment}>{el.name}</Text>
                    <Text style={styles.comment}>{el.comment}</Text>
                  </View>
                </View>
              )
            })
          }

          <View style={styles.rowComment}>
          <SvgUri
                    width="35"
                    height="35"
                    source={{ uri: `https://avatars.dicebear.com/api/human/:${user.fullname}.svg` }}
                  />
            <View style={styles.boxStatus}>
              <TextInput defaultValue={state} onChangeText={(e) => inputHandler(e)} style={styles.inputStatus} placeholder="add a comment" placeholderTextColor="#625261" multiline />
            </View>
            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={submitHandler}>
              <FontAwesome name="paper-plane" size={20} color="#2FBBF0" />
            </TouchableOpacity>
          </View>

        </ScrollView>
        <BottomNavigator></BottomNavigator>
      </View>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    backgroundColor: '#161C2B',
    width: '100%',
    height: '100%',
    top: 0
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
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 60,
    // backgroundColor: '#FAFAFA',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    // height: '100%'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
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
    marginBottom: 20
  },
  box: {
    flexDirection: 'column',
    width: '100%',
    marginLeft: '15%',
    marginTop: 25
  },
  row: {
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '1%'
  },
  rowComment: {
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '1%',
    alignSelf: 'flex-start',
    paddingHorizontal: 30
  },
  boxProfile: {
    flexDirection: 'column',
    marginHorizontal: 15,
    marginBottom: 5,
  },
  column: {
    flexDirection: 'column',
    marginLeft: 15,
  },
  name: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    marginBottom: 1,
    fontWeight: 'bold'
  },
  nameComment: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    marginBottom: 1,
    fontWeight: 'bold'
  },
  comment: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    marginBottom: 1
  },
  status: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    marginTop: 12,
    marginBottom: 8
  },
  inputText: {
    width: '100%',
    marginTop: 15,
    marginBottom: 5,
    fontSize: 18,
  },
  location: {
    fontFamily: 'Ubuntu_300Light',
    fontSize: 16,
  },
  boxText: {
    width: '97%',
    marginBottom: 6,
    color: 'white',
  },
  inputStatus: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    color: '#625261',
    marginLeft: 15,
  },
  boxImage: {
    width: '100%',
  },
  boxStatus: {
    width: '75%',
    backgroundColor: '#e6e6e6',
    borderRadius: 20,
    marginHorizontal: 15
    // borderWidth: 0.5
  },
  boxCard: {
    width: '90%',
    // backgroundColor: '#161C2B'
  },
  card: {
    justifyContent: 'flex-start',
    width: '94%',
  },
  cardStatus: {
    marginBottom: 10,
    justifyContent: 'flex-start',
    width: '94%',
  },
  hr: {
    borderBottomColor: '#A2A2A2',
    borderBottomWidth: 0.25,
    width: '86%',
    marginBottom: 8,
    marginTop: 5
  },
  addPhotos: {
    fontFamily: 'Ubuntu_300Light',
    fontSize: 13, marginTop: 3,
    fontWeight: 'bold', marginLeft: 10,
    justifyContent: "center", borderWidth: 0.5,
    padding: 5, paddingHorizontal: 13, height: 29,
    backgroundColor: '#FAFAFA', borderColor: '#E3E3E3',
    borderRadius: 5
  }
});


export default Discover