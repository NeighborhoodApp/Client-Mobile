import React , {useState} from 'react'
// import { View, Text, StyleSheet } from 'react-native'
import { Button, Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';


function Coba () {    
    const [isModalVisible, setModalVisible] = useState(false);
    const [isFocused, setIsFocused] = useState('true');
    const setStyle = () => {
        setIsFocused(!isFocused);
      };

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    return (
    //     <View style={styles.container}>
    //     <Button title="Show modal" onPress={toggleModal} />
    //     <Modal isVisible={isModalVisible}>
    //     <View style={styles.container}>
    //         <View style={{height:130, marginTop: 20, marginLeft:20}}>
    //       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    //         <TouchableOpacity style={isFocused? styles.button1 : styles.button2} onPress={setStyle}>
    //             <Image style={isFocused? styles.image1: styles.image2} source={require('../assets/icon_events/e_birthday.png')}/>
    //             <Text style={isFocused? styles.textBtn1: styles.textBtn2}>Birthday</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={isFocused? styles.button1 : styles.button2} onPress={setStyle}>
    //             <Image style={isFocused? styles.image1: styles.image2} source={require('../assets/icon_events/e_olahraga.png')}/>
    //             <Text style={isFocused? styles.textBtn1: styles.textBtn2}>Olahraga</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={styles.button1}>
    //             <Image style={styles.image1} source={require('../assets/icon_events/e_rapat.png')}/>
    //             <Text style={styles.textBtn1}>Rapat</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={styles.button1}>
    //             <Image style={styles.image1} source={require('../assets/icon_events/e_others.png')}/>
    //             <Text style={styles.textBtn1}>Others</Text>
    //         </TouchableOpacity>
    //   </ScrollView>
    //   </View>
    //         <Text style={{ alignSelf:'flex-start', marginLeft:30, fontWeight:'600', color:'#666E83', marginTop:20 }}>Tittle</Text>
    //         <TextInput placeholder="Tetonggo Event" placeholderTextColor="black" style={{height:'6%', width:'80%',backgroundColor:'white', borderBottomColor:'black'}}></TextInput>
    //         <Text style={{textAlign:'left', alignSelf:'flex-start', marginLeft:30, marginBottom: 10, fontWeight:'600', color:'#434853', marginTop:20}}>Date</Text>
    //         <TextInput placeholder="Date" style={{height:'6%', width:'80%',backgroundColor:'white', borderBottomColor:'black'}}></TextInput>
    //         <Text style={{textAlign:'left', alignSelf:'flex-start', marginLeft:30, marginBottom: 10, fontWeight:'600',  color:'#434853', marginTop:20}}>Add a Note</Text>
    //         <TextInput placeholder="Write a note here" style={{height:'6%', width:'80%',backgroundColor:'white', borderBottomColor:'black'}}></TextInput>
    //         <TouchableOpacity  onPress={toggleModal} style={{width: '70%', height:40, backgroundColor:'#161C2B', paddingVertical:10, marginTop:30}}>
    //             <Text style={{alignSelf:'center', fontWeight:'bold', color:'white'}}>SAVE</Text>
    //         </TouchableOpacity>
    //         {/* <Button title=" x " onPress={toggleModal} /> */}
    //       </View>
    //     </Modal>
    //   </View>
       <View>
       <TouchableOpacity style={{width:100, height:100, backgroundColor:'pink'}}
           onPress={() => {toggleModal}}
           >
           <Text>Show Modal</Text>

       </TouchableOpacity>
       <Button title="Show modal" onPress={toggleModal} />
       <Modal isVisible={isModalVisible}>
           <View style={styles.container}>
               <View style={{height:130, marginTop: 20, marginLeft:20}}>
           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
               <TouchableOpacity style={isFocused? styles.button1 : styles.button2} onPress={setStyle}>
                   <Image style={isFocused? styles.image1: styles.image2} source={require('../assets/icon_events/e_birthday.png')}/>
                   <Text style={isFocused? styles.textBtn1: styles.textBtn2}>Birthday</Text>
               </TouchableOpacity>
               <TouchableOpacity style={isFocused? styles.button1 : styles.button2} onPress={setStyle}>
                   <Image style={isFocused? styles.image1: styles.image2} source={require('../assets/icon_events/e_olahraga.png')}/>
                   <Text style={isFocused? styles.textBtn1: styles.textBtn2}>Olahraga</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.button1}>
                   <Image style={styles.image1} source={require('../assets/icon_events/e_rapat.png')}/>
                   <Text style={styles.textBtn1}>Rapat</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.button1}>
                   <Image style={styles.image1} source={require('../assets/icon_events/e_others.png')}/>
                   <Text style={styles.textBtn1}>Others</Text>
               </TouchableOpacity>
       </ScrollView>
       </View>
               <Text style={{ alignSelf:'flex-start', marginLeft:30, fontWeight:'600', color:'#666E83', marginTop:20 }}>Tittle</Text>
               <TextInput placeholder="Tetonggo Event" placeholderTextColor="black" style={{height:'6%', width:'80%',backgroundColor:'white', borderBottomColor:'black'}}></TextInput>
               <Text style={{textAlign:'left', alignSelf:'flex-start', marginLeft:30, marginBottom: 10, fontWeight:'600', color:'#434853', marginTop:20}}>Date</Text>
               <TextInput placeholder="Date" style={{height:'6%', width:'80%',backgroundColor:'white', borderBottomColor:'black'}}></TextInput>
               <Text style={{textAlign:'left', alignSelf:'flex-start', marginLeft:30, marginBottom: 10, fontWeight:'600',  color:'#434853', marginTop:20}}>Add a Note</Text>
               <TextInput placeholder="Write a note here" style={{height:'6%', width:'80%',backgroundColor:'white', borderBottomColor:'black'}}></TextInput>
               <TouchableOpacity  onPress={toggleModal} style={{width: '70%', height:40, backgroundColor:'#161C2B', paddingVertical:10, marginTop:30}}>
                   <Text style={{alignSelf:'center', fontWeight:'bold', color:'white'}}>SAVE</Text>
               </TouchableOpacity>
               {/* <Button title=" x " onPress={toggleModal} /> */}
           </View>
       </Modal>
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
    button1: {
        height:110, 
        width:90,
        marginRight:20, 
        justifyContent:'center', 
        backgroundColor:'#E2FBFF', 
        borderRadius:10,
    },
    image1:{
        width:60, height:60, alignSelf:'center',backgroundColor:'#161C2B', borderRadius:40
    },
    textBtn1:{
        textAlign:'center', fontWeight:'bold', marginTop:5, color:'#000'
    },
    button2: {
        height:110, width:90,marginRight:20, justifyContent:'center', backgroundColor:'#161C2B', borderRadius:10
    },
    textBtn2:{
        textAlign:'center', fontWeight:'bold', marginTop:5, color:'#fff'
    },
    image2:{
        width:60, height:60, alignSelf:'center',backgroundColor:'#E2FBFF', borderRadius:40
    },
});
  

export default Coba