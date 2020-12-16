import React, { useEffect, useState }  from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { Avatar } from 'react-native-paper';
import { useFonts, Ubuntu_300Light,Ubuntu_500Medium } from '@expo-google-fonts/ubuntu'
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'
import { FontAwesome, Fontisto, Feather, Entypo, MaterialIcons, FontAwesome5, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import callServer from '../helpers/callServer';
import AppLoading from 'expo-app-loading';
import DateTimePicker from '@react-native-community/datetimepicker';


function Fees({navigation}) {    
    let [loaded] = useFonts({
        Ubuntu_300Light, Montserrat_600SemiBold, Ubuntu_500Medium
    });
    const dispatch = useDispatch()
    const [state, setState] = useState({
      due_date: new Date().toDateString(),
      show: false
    })

    function toNotification(){
      const { due_date, name, description } = state
      let date = new Date(due_date)
      date = (date.getFullYear()+'-'+(Number(date.getMonth())+1)+'-'+date.getDate())
      dispatch(callServer({
        headers: true,
        method: 'post',
        url: 'fee',
        body: { due_date: date, name, description },
        type: 'SET_FEE'
      }))
      // const data = { ...input, due_date: date }
      // delete state.date
      // console.log(state);asdas
      // dispatch()
      // navigation.navigate('Notification')
    }

    function handleDate(eve, val) {
      // const due_date = val.toDateString() || state.due_date
      if (eve.type === 'set') setState({ ...state, due_date: val.toDateString(), show: false })
      // const date = (val.getFullYear()+'-'+(Number(val.getMonth())+1)+'-'+val.getDate()) || state.date
    }
    function handleInput (val, key) {
      setState({ ...state, [key]: val })
    }

    if (!loaded) return <AppLoading />
    
    return (
        <View style={styles.container}>
            {/* >>>>>> PROFILE PAGE <<<<<<< */}
            <View style={styles.images}>
            <Avatar.Image
                size={100}
                source={{
                uri:
                    'https://i.pinimg.com/474x/73/c3/e7/73c3e7cca66a885c53718d8f3688b02c.jpg',
                }}
            />
            </View>
            <View style={styles.box}>
                {/* >>>>>> FEES PAGE <<<<<<< */}
                <View style={styles.input}>
                  <FontAwesome name="pencil-square-o" size={20} color="white" style={{marginLeft:6}} />
                  <TextInput onChangeText={val => handleInput(val, 'name')} style={styles.Textinput} placeholder="Name" placeholderTextColor="#FFF" />
                </View>
                <View style={styles.hr}/>
                <View style={styles.input}>
                  <MaterialIcons name="description" size={20} color="white" style={{marginLeft:6}} />
                  {/* <FontAwesome5 name="search-dollar" size={20} color="white" style={{marginLeft:6}} /> */}
                  <TextInput onChangeText={val => handleInput(val, 'description')} style={styles.Textinput} placeholder="Description" placeholderTextColor="#FFF" />
                </View>
                <View style={styles.hr}/>
                <View style={styles.input}>
                  <AntDesign name="clockcircle" size={19} color="white" style={{marginLeft:6}} />
                  <TouchableOpacity >
                    <Text
                      style={{
                        height: 25, 
                        fontFamily: 'Ubuntu_300Light', 
                        color: 'white',
                        marginLeft: 15,
                        fontSize: 15,
                        marginBottom: 8
                        }} 
                      // value={state.date}
                      placeholder='Due Date'
                      onPress={_=> {
                        // const date = state.date || new Date()
                        setState({ ...state, show: true })
                        }}
                      placeholderTextColor="#FFF" >{state.due_date} </Text>
                  </TouchableOpacity>
                </View>
                {state.show === true ? <DateTimePicker
                  value={new Date(state.due_date)}
                  minimumDate={new Date()}
                  mode='date'
                  placeholder='Due Date'
                  onChange={(e, v) => handleDate(e, v)}
                  /> : null}

                <View style={styles.hr}/>
                {/* >>>>>> BUTTON FOR CREATE FEES <<<<<<< */}
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.submit} onPress={toNotification} > SUBMIT </Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    images: {
        top: 0,
        marginTop: 25,
        marginBottom:20,
        position: "absolute"
    },
    input: {
        marginTop:10,
        textAlign: 'left', 
        alignSelf: 'stretch',
        marginLeft: 40,
        flexDirection: 'row',
        backgroundColor: '#161C2B'
    },
    box: {
        backgroundColor: '#161C2B',
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 45,
        paddingVertical: 14,
        position: 'absolute',
        top: 100
    },
    Textinput: {
        height: 25, 
        fontFamily: 'Ubuntu_300Light', 
        color: 'white',
        marginLeft: 15,
        fontSize: 15,
        marginBottom: 8
    },
    hr: {
        borderBottomColor: '#A2A2A2', 
        borderBottomWidth: 0.6, 
        width: '80%', 
        marginBottom: 10

    },
    btn: {
        elevation: 8,
        backgroundColor: "#2FBBF0",
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
  

export default Fees