import React, { useEffect }  from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { Avatar } from 'react-native-paper';
import { useFonts, Ubuntu_300Light,Ubuntu_500Medium } from '@expo-google-fonts/ubuntu'
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'
import { FontAwesome, Fontisto, Feather, Entypo, FontAwesome5, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { useDispatch, useSelector } from 'react-redux';
import callServer from '../helpers/callServer'

function Profile({navigation}) {    
    let [loaded] = useFonts({
        Ubuntu_300Light, Montserrat_600SemiBold, Ubuntu_500Medium
    });
    const dispatch = useDispatch()
    const { loading, user, stage } = useSelector(s => s.reducerUser) // Problem Combine Reducer

    function toNotification(){
        navigation.navigate('Notification')
    }
  
    useEffect(_=> {
      dispatch(callServer({
        url: 'users/5',
        method: 'get',
        type: 'SET_USER',
        headers: true
      }))
    }, [])

    if (!loaded) return <AppLoading />

    if (loading) return <AppLoading />
      
    return (
        <View style={styles.container}>
            {/* >>>>>> PROFILE PAGE <<<<<<< */}
            { console.log(user, '<<<<<<<<< ini user') }
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
                <View stle = {styles.bg}></View>
                <View style={styles.input}>
                    <FontAwesome name="user" size={20} color="white" style={{marginLeft:10}}/>
                    <Text style={styles.Textinput} placeholder="Full Name" placeholderTextColor="#FFF">{user.foundUser.fullname} </Text>
                </View>
                <View style={styles.hr} />
                <View style={styles.input}>
                    <Fontisto name="email" size={20} color="white" style={{marginLeft:5}}/>
                    <Text style={styles.Textinput} placeholder="Email" placeholderTextColor="#FFF">{user.foundUser.email} </Text>
                </View>
                <View style={styles.hr} />
                <View style={styles.input}>
                    <Entypo name="location" size={20} color="white" style={{marginLeft:6}}/>
                    <Text style={styles.Textinput} placeholder="Address" placeholderTextColor="#FFF" >{user.foundUser.address} </Text>
                </View>
                <View style={styles.input}>
                    <MaterialCommunityIcons name="home-group" size={20} color="white" style={{marginLeft: 6}} />
                    <Text style={styles.Textinput} placeholder="Address" placeholderTextColor="#FFF" >{user.foundUser.RealEstate.name} </Text>
                </View>
                <View style={styles.input}>
                    <Entypo name="address" size={20} color="white" style={{marginLeft:6}}/>
                    <Text style={styles.Textinput} placeholder="Address" placeholderTextColor="#FFF" >{user.foundUser.Complex.name} </Text>
                </View>

                {/* >>>>>> FEES PAGE <<<<<<< */}
                {/* <View style={styles.input}>
                    <FontAwesome name="pencil-square-o" size={20} color="white" style={{marginLeft:6}} />
                    <TextInput style={styles.Textinput} placeholder="Title" placeholderTextColor="#FFF" />
                </View>
                <View style={styles.hr}/>
                <View style={styles.input}>
                    <FontAwesome5 name="search-dollar" size={20} color="white" style={{marginLeft:6}} />
                    <TextInput style={styles.Textinput} placeholder="Fees" placeholderTextColor="#FFF" />
                </View>
                <View style={styles.hr}/>
                <View style={styles.input}>
                    <AntDesign name="clockcircle" size={19} color="white" style={{marginLeft:6}} />
                    <TextInput style={styles.Textinput} placeholder="Due Date " placeholderTextColor="#FFF" />
                </View>
                <View style={styles.hr}/> */}
                {/* >>>>>> BUTTON FOR CREATE FEES <<<<<<< */}
                {/* <TouchableOpacity style={styles.btn}>
                    <Text style={styles.submit} onPress={toNotification} > SUBMIT </Text>
                </TouchableOpacity> */}
                
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
  

export default Profile