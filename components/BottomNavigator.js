import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Text, Alert } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';

export default class BottomNavigator extends Component {
    
    toggleOpen = () => { }
    
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}>
                <View style={styles.outerCircle}>
                    <TouchableWithoutFeedback onPress={this.toggleOpen}>
                        <View style={[styles.button, styles.actionBtn]}>
                            <FontAwesome name="plus" size={18} color="white" />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {/* >>>>>>> BOX NAVIGATOR <<<<< */}
                <View style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    border: 2,
                    radius: 3,
                    shadowOpacity: 0,
                    shadowRadius: 3,
                    shadowOffset: {
                        height: 1, width: 1
                    },
                    x: 0,
                    y: 0,
                    style: { marginVertical: 5 },
                    bottom: 0,
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 25,
                    borderWidth:0.5

                }}>
                
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => { Alert.alert('click') }}>
                    <MaterialIcons name="home" size={26} color="#2FBBF0" />
                    </TouchableOpacity>
                </View>
                    
                <View style={{flexDirection: 'column', alignItems: 'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={() => { Alert.alert("click") }}>
                    <Ionicons name="ios-chatbox-ellipses-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'column', alignItems: 'center',justifyContent:'space-between',marginStart:80}}>
                    <TouchableOpacity onPress={() => { Alert.alert("click") }} style={{marginTop:10}}>
                        <Ionicons name="ios-notifications-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'column', alignItems: 'center',justifyContent:'flex-end'}}>
                    <TouchableOpacity onPress={() => {navigation.navigate('Profile')}} style={{marginBottom:14}}>
                    <AntDesign name="user" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                    {/* </View> */}
                </View>
            </View>
        );
    }

    
}


const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    outerCircle: {
        elevation: 9,
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 35,
        bottom: 35,
    },
    button: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'grey',
        shadowOpacity: 0.1,
        shadowOffset: { x: 2, y: 0 },
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 0,
        top: 5,
        left: 5,
        shadowOpacity: 5.0,

    },
    actionBtn: {
        backgroundColor: '#2FBBF0',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: '#fff'
    }
});
