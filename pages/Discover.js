import React, { useState, useEffect }  from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {  useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
import { FontAwesome } from '@expo/vector-icons';
import { Card } from 'react-native-paper';

function Discover ({ navigation }) {   
    let [loaded] = useFonts({
        Poppins_600SemiBold
    });

    // >>>>>>>>> HEADER OPTIONS <<<<<<<<<<<<<
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{marginRight: 30, borderWidth:3, borderColor:'white', borderRadius:50}} onPress={() => {navigation.navigate('Menu')}}>
                    <Avatar.Image size={48} source={{ uri: 'https://i.pinimg.com/474x/73/c3/e7/73c3e7cca66a885c53718d8f3688b02c.jpg',}}/>
                </TouchableOpacity> 
            ),
        })
    }, [navigation])

    const [selectedValue, setSelectedValue] = useState("public");

    return (
        <SafeAreaView style={styles.bg}>
        <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        >
        <View style={styles.boxAwal}>
            <View style={styles.row}>
                <Avatar.Image size={39} style={{marginTop:5}}
                    source={{
                        uri: 'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/07/black-men-haircuts-afro-natural-hair-683x1024.jpg',
                    }}
                />
                <View style={styles.boxProfile}>
                    <Text style={styles.name}>Bambang Gentolet</Text>
                    <DropDownPicker
                        items={[
                            {label: 'Public', value: 'public', hidden: true },
                            {label: 'Complex', value: 'complex' },
                        ]}
                        defaultValue={selectedValue}
                        containerStyle={{height: 30, width: '80%', alignSelf: 'flex-start'}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        labelStyle={{
                            fontSize: 13,
                            textAlign: 'left',
                            color: '#000'
                        }}
                    />
                </View>
            </View>
            <View style={styles.boxCard}>
                <View style={styles.boxText}>
                    <TextInput style={styles.inputText} placeholder="What’s on your mind?"/>
                </View>
            </View>
        </View>
            
            {/* >>>>>>>>>>>>> BATAS SUCI <<<<<<<<<<<<< */}
        <View style={styles.box}>
            <View style={styles.hr} />
            <View style={styles.row}>
                <Avatar.Image size={39}
                    source={{
                        uri: 'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/07/black-men-haircuts-afro-natural-hair-683x1024.jpg',
                    }}
                />
                <View style={styles.boxProfile}>
                    <Text style={styles.name}>Bambang Gentolet</Text>
                    <Text styles={styles.location}>Komplek Bojongkenyot</Text>
                </View>
            </View>
            <View style={styles.hr} />
            <View style={styles.boxCard}>
                <View style={styles.boxText}>
                    <Text style={styles.status}>Ada yang liat kucing aku ngga ya? Aku sedih sekali udah cari kemana-mana ga ketemu</Text>
                </View>
                <Card style={styles.card}>
                    <Card.Cover source={{ uri:'https://mk0punsjokesui4twax7.kinstacdn.com/wp-content/uploads/2020/05/cute-cat.jpg' }} />
                </Card>
                <Text style={styles.status}><FontAwesome name="comment" size={20} color="black" /> 2</Text>
            </View>
            {/* <View style={styles.hr} /> */}
        </View>
        <View style={styles.box}>
            <View style={styles.hr} />
            <View style={styles.row}>
                <Avatar.Image size={39}
                    source={{
                        uri: 'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/07/black-men-haircuts-afro-natural-hair-683x1024.jpg',
                    }}
                />
                <View style={styles.boxProfile}>
                    <Text style={styles.name}>Bambang Gentolet</Text>
                    <Text styles={styles.location}>Komplek Bojongkenyot</Text>
                </View>
            </View>
            <View style={styles.hr} />
            <View style={styles.boxCard}>
                <View style={styles.boxText}>
                    <Text style={styles.status}>Ada yang liat kucing aku ngga ya? Aku sedih sekali udah cari kemana-mana ga ketemu</Text>
                </View>
                <Card style={styles.card}>
                    <Card.Cover source={{ uri:'https://mk0punsjokesui4twax7.kinstacdn.com/wp-content/uploads/2020/05/cute-cat.jpg' }} />
                </Card>
                <Text style={styles.status}><FontAwesome name="comment" size={20} color="black" /> 2</Text>
            </View>
            <View style={styles.hr} />
        </View>
      </ScrollView>
    </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    bg: {
        position: 'absolute',
        backgroundColor: '#161C2B',
        width: '100%',
        height: '100%',
        top:0
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
        marginLeft:'15%',
        marginTop:30,
        marginBottom:20
    },
    box: {
        flexDirection: 'column',
        width: '100%',
        marginLeft:'15%',
        marginTop:5
    },
    row: {
        flexDirection: 'row',
        marginTop:'1%',
        marginBottom: '1%'
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
        fontFamily:'Poppins_600SemiBold',
        fontSize: 14,
        marginBottom: 1,
        fontWeight:'bold'
    },
    status: {
        fontFamily:'Poppins_600SemiBold',
        fontSize: 15,
        marginTop:12,
        marginBottom: 8
    },
    inputText: {
        width: '100%',
        marginTop:15,
        marginBottom: 5,
        fontSize: 18,
    },
    location: {
        fontFamily: 'Ubuntu_300Light',
        fontSize: 12,
    }, 
    boxText: {
        width:'97%', 
    },
    boxImage: {
        width:'100%', 
    },
    boxCard: {
        width:'90%', 
    },
    card: {
        justifyContent: 'flex-start',
        width:'94%', 
    },
    hr: {
        borderBottomColor: '#A2A2A2',
        borderBottomWidth: 0.25,
        width: '86%',
        marginBottom: 8,
        marginTop:5
    },
    
});
  

export default Discover