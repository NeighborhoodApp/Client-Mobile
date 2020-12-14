import React  from 'react'
import { View, Text, StyleSheet, Image , TouchableOpacity } from 'react-native'
import { useFonts, Ubuntu_300Light, Ubuntu_500Medium, Ubuntu_700Bold, } from '@expo-google-fonts/ubuntu'
import {  Montserrat_500Medium } from '@expo-google-fonts/montserrat'
import { AntDesign } from '@expo/vector-icons'; 

function Waiting({navigation}) {   
    let [loaded] = useFonts({
        Ubuntu_300Light, Ubuntu_500Medium, Ubuntu_700Bold, Montserrat_500Medium 
    });

    function toDiscover(){
        navigation.navigate('Discover')
    }

    return (
        <View style={styles.container}>
            <Image style={styles.waiting} source={require('../assets/waiting.png')} />
            <View style={styles.box}> 
                <Text style={styles.firstLine}> Hi, Tetonggo! </Text> 
                {/* <Text style={styles.secondLine}> Please wait... {"\n"} until your account {"\n"} is verified.</Text> */}
                <Text style={styles.secondLine}> Your account is Verified {"\n"} Click "Next" to connect{"\n"} with your neighbour</Text>
            </View>
            <View style={styles.footer}>
                <View style={styles.row} onPress={toDiscover}>
                    <Text style={styles.next} onPress={toDiscover}> Next </Text> 
                    <TouchableOpacity style={styles.btn_next}>
                        <AntDesign name="right" size={16} color="black" onPress={toDiscover}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    waiting: {
        width: 680,
        height: 380,
        alignSelf: 'flex-start',
        marginLeft: 50,
        marginTop: 90
    },
    box: {
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        marginTop:-20,
        backgroundColor: '#161C2B',
        paddingVertical: '20%',
        width: '100%', 
        height:'45%',
        bottom:0
    },
    footer: {
        backgroundColor: '#161C2B',
        position: 'absolute',
        alignSelf: 'flex-end',
        position: 'absolute',
        height:'5%',
        width: '100%',
        bottom: 0
    },
    firstLine: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    
    },
    secondLine: {
        marginTop: 30,
        fontFamily: 'Montserrat_500Medium',
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        paddingBottom: 2
    
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        bottom: 10
    },
    next: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 15,
        color: 'white',
        right: 20,
    },
    btn_next: {
        backgroundColor: "#9CEFFE",
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 8,
        right: 10,
        bottom: 5
    }
});
  

export default Waiting