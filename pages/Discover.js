import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { Avatar } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { FontAwesome } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { registerPushNotification } from '../helpers/PushNotification';
import { verifyUser } from '../helpers/verify';

function Discover() {
  let [loaded] = useFonts({
    Poppins_600SemiBold,
  });
  const [selectedValue, setSelectedValue] = useState('public');
  const [expoPushToken, setExpoPushToken] = useState('');

  // useEffect(() => {
  //   registerPushNotification().then((token) => setExpoPushToken(token));
  // }, []);

  // useEffect(() => {
  //   verifyUser(expoPushToken);
  // }, [expoPushToken]);

  if (!loaded) return <AppLoading />;

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <View style={styles.row}>
          <Avatar.Image
            size={55}
            source={{
              uri:
                'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/07/black-men-haircuts-afro-natural-hair-683x1024.jpg',
            }}
          />
          <View style={styles.column}>
            <Text style={styles.name}>Bambang Gentolet</Text>
            <DropDownPicker
              items={[
                { label: 'Public', value: 'public', hidden: true },
                { label: 'Complex', value: 'complex' },
              ]}
              defaultValue={selectedValue}
              containerStyle={{ height: 30, width: '80%', alignSelf: 'flex-start' }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              labelStyle={{
                fontSize: 14,
                textAlign: 'left',
                color: '#000',
              }}
              // onChangeItem={item => selectedValue({ selectedValue: item.value })}
            />
            <View style={styles.boxText}>
              <Text style={styles.status}>What’s on your mind?</Text>
            </View>
          </View>
        </View>

        {/* >>>>>>>>>>>>> BATAS SUCI <<<<<<<<<<<<< */}
        <View style={styles.row}>
          <Avatar.Image
            size={55}
            source={{
              uri:
                'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/07/black-men-haircuts-afro-natural-hair-683x1024.jpg',
            }}
          />
          <View style={styles.column}>
            <Text style={styles.name}>Bambang Gentolet</Text>
            <Text styles={styles.location}>Komplek Bojongkenyot</Text>
            <View style={styles.boxText}>
              <Text style={styles.status}>
                Ada yang liat kucing aku ngga ya? Aku sedang sedih sekali teman temen {'\n'}
                {'\n'}
                <FontAwesome name="comment" size={20} color="black" /> 2
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.hr} />
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
  col: {
    position: 'absolute',
    flexDirection: 'column',
    width: '100%',
    top: 10,
    left: 30,
  },
  row: {
    flexDirection: 'row',
    marginTop: 40,
  },
  column: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  name: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    // marginLeft: 20,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  status: {
    marginTop: 30,
    fontSize: 17,
    marginLeft: -70,
    // width:'100%',
    // borderWidth:1
  },
  location: {
    fontFamily: 'Ubuntu_300Light',
    // marginLeft: 25,
    fontSize: 15,
  },
  boxText: {
    width: '80%',
  },
  hr: {
    borderBottomColor: '#A2A2A2',
    borderBottomWidth: 0.3,
    width: '85%',
    marginTop: 10,
  },
});

export default Discover;
