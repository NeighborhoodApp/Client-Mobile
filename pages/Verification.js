import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Ubuntu_300Light, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu';
import AppLoading from 'expo-app-loading';

function Verification() {
  const [loaded] = useFonts({
    Roboto_700Bold,
    Ubuntu_300Light,
    Ubuntu_500Medium,
  });

  if (!loaded) return <AppLoading />;

  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <Text style={styles.title}> New </Text>
        <View style={styles.row}>
          <Avatar.Image
            size={55}
            source={{
              uri: 'https://i.pinimg.com/originals/b5/a6/3b/b5a63b0da8d66df3dd10f269be70ea88.jpg',
            }}
          />
          <View style={styles.column}>
            <Text style={styles.name}>Maria DB</Text>
            <Text style={styles.address}>Jl. Bojongkenyot VI G-18</Text>
          </View>
          <View style={styles.container_button}>
            <TouchableOpacity onPress={() => console.log('Pressed')} style={styles.btn_confirm}>
              <Text style={styles.confirm}> Confirm </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Pressed')} style={styles.btn_delete}>
              <Text style={styles.delete}> Delete </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <Avatar.Image
            size={55}
            source={{
              uri:
                'https://previews.123rf.com/images/rido/rido1204/rido120400047/13283722-happy-smiling-guy-showing-thumb-up-hand-sign-isolated-on-white-background.jpg',
            }}
          />
          <View style={styles.column}>
            <Text style={styles.name}>Postgre Siqil</Text>
            <Text style={styles.address}>Jl. Bojongkenyot VI G-20</Text>
          </View>
          <View style={styles.container_button}>
            <TouchableOpacity onPress={() => console.log('Pressed')} style={styles.btn_confirm}>
              <Text style={styles.confirm}> Confirm </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Pressed')} style={styles.btn_delete}>
              <Text style={styles.delete}> Delete </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  items: {
    position: 'absolute',
    top: 30,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    marginTop: 15,
  },
  column: {
    flexDirection: 'column',
  },
  name: {
    fontFamily: 'Roboto_700Bold',
    fontWeight: 'bold',
    marginLeft: 20,
    fontSize: 16,
  },
  address: {
    fontFamily: 'Ubuntu_300Light',
    marginLeft: 20,
    fontSize: 13,
  },
  size: {
    fontSize: 10,
  },
  btn_confirm: {
    elevation: 8,
    backgroundColor: '#5CB409',
    borderRadius: 6,
    marginTop: 5,
    marginLeft: 2,
    width: 60,
    height: 30,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_delete: {
    elevation: 8,
    backgroundColor: '#fff',
    borderColor: '#161C2B',
    borderWidth: 0.3,
    borderRadius: 6,
    marginTop: 5,
    marginLeft: 2,
    width: 60,
    height: 30,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirm: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  delete: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 12,
    color: '#161C2B',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_button: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 25,
  },
});

export default Verification;
