import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
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
import axios from 'axios'
import { socket } from '../helpers/socket'

function Discover({ route, navigation }) {
  const { comments, error, stage, loading } = useSelector((state) => state.reducerComment);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [com, setCom] = useState([])
  const [state, setState] = useState('')
  const [chat, setChat] = useState([])
  const { id } = route.params
  let [loaded] = useFonts({
    Poppins_600SemiBold, Ubuntu_300Light
  });

  console.log(id)
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
    const tes = async () => {
      const value = await AsyncStorage.getItem('userlogedin');
      const json = JSON.parse(value);
      setUser(json);
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 30, borderWidth: 3, borderColor: 'white', borderRadius: 50 }} onPress={() => { navigation.navigate('Menu') }}>
            <Avatar.Image size={48} source={{ uri: 'https://i.pinimg.com/474x/73/c3/e7/73c3e7cca66a885c53718d8f3688b02c.jpg', }} />
          </TouchableOpacity>
        ),
      })
      fetchComment()
    }
    tes()
    setCom(comments)
    socket.emit('join', id);

    socket.on('comment', ({ comment }) => {
      console.log(comment)
      setCom([...com, comment])
    })
    return () => {
      socket.emit('dc', id)
      console.log('out')
    }
  }, [navigation])


  const inputHandler = (e) => {
    setState(e)
  }

  const submitHandler = async () => {
    // await axios({
    //   method: 'post',
    //   url: `http://192.168.1.12:3000/comment/${id}`,
    //   data: {
    //     comment: state
    //   },
    //   headers: {
    //     access_token: user.access_token
    //   }
    // })
    // fetchComment()
    socket.emit('new comment', { comment: state, id });
    setState('')
  }

  if (!loaded) return <AppLoading />;
  if (!stage) return <AppLoading />

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {/* >>>>>>>>>>>>> BATAS SUCI <<<<<<<<<<<<< */}
        <View style={styles.box}>
          <View style={styles.row}>
            <Avatar.Image size={55}
              source={{
                uri: 'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/07/black-men-haircuts-afro-natural-hair-683x1024.jpg',
              }}
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
              comments.image !== '' &&
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
                <Avatar.Image size={35}
                  source={{
                    uri: 'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/07/black-men-haircuts-afro-natural-hair-683x1024.jpg',
                  }}
                />
                <View style={styles.boxProfile}>
                  <Text style={styles.nameComment}>{el.User.fullname}</Text>
                  <Text style={styles.comment}>{el.comment}</Text>
                </View>
              </View>
            )
          })
        }

        <View style={styles.rowComment}>
          <Avatar.Image size={35}
            source={{
              uri: 'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/07/black-men-haircuts-afro-natural-hair-683x1024.jpg',
            }}
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
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    top: 0
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