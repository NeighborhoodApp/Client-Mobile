import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts, Ubuntu_300Light, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import AppLoading from 'expo-app-loading';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-paper';

const defaultVal = [
  { label: ' Riyan', value: 'usa', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true },
  { label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" /> },
  { label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" /> },
];

let isLoaded = false;
let call = 1;
let controller;
function PickLocation() {
  let [loaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_500Medium,
    Ubuntu_700Bold,
    Montserrat_500Medium,
  });
  const [selectedValue, setSelectedValue] = useState(4);
  const [items, setItems] = useState(null);
  const { realEstates, error, stage } = useSelector((state) => state.reducerRealEstate);

  useEffect(() => {
    addComplex(selectedValue);
  }, [selectedValue])
  
  const addItem = () => {
    const temp = [];
    realEstates.forEach((el) => {
      if (el.status === 'Active') 
        temp.push({
          label: el.name,
          value: el.id,
          icon: () => <Icon name="flag" size={18} color="#900" />,
        });
    });
    setItems(temp);
  }

  const addComplex = (id) => {
    const currentComplex = realEstates.filter(el => el.id === id)
    console.log(currentComplex)
  }

  console.log(!isLoaded && realEstates.length > 0);
  if (!isLoaded && realEstates.length > 0) {
    addItem();
    isLoaded = true;
  }

  if (!loaded) return <AppLoading />;

  return (
    <View style={styles.container}>
      <Image style={styles.house} source={require('../assets/house.gif')} />
      <View style={styles.box}>
        <Text style={styles.firstLine}> Pick Real Estate </Text>
        {!items ? null : (
          <DropDownPicker
            items={items}
            searchable={true}
            searchablePlaceholder="Search for an item"
            // defaultValue={selectedValue}
            containerStyle={{ height: 40, width: '80%', justifyContent: 'center', alignSelf: 'center' }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{ backgroundColor: '#fafafa', height: 300 }}
            dropDownMaxHeight={300}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            // onChangeItem={item => selectedValue({ selectedValue: item.value })}
          />
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.row}>
          <Text style={styles.next}> Next </Text>
          <TouchableOpacity style={styles.btn_next}>
            <AntDesign name="right" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  house: {
    width: 450,
    height: 360,
    alignSelf: 'flex-start',
    marginLeft: -30,
    position: 'absolute',
    bottom: 80,
    // marginTop: 90
  },
  box: {
    position: 'absolute',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    // marginTop:-15,
    backgroundColor: '#161C2B',
    paddingVertical: '20%',
    width: '100%',
    height: '60%',
    top: 0,
  },
  footer: {
    backgroundColor: '#161C2B',
    position: 'absolute',
    alignSelf: 'flex-end',
    position: 'absolute',
    height: '10%',
    width: '100%',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstLine: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  secondLine: {
    marginTop: 30,
    fontFamily: 'Montserrat_500Medium',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingBottom: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 0,
  },
  next: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 15,
    color: 'white',
    right: 20,
  },
  btn_next: {
    backgroundColor: '#9CEFFE',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 8,
    right: 10,
    bottom: 5,
  }
});

export default PickLocation;
