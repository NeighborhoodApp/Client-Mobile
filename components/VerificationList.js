import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Ubuntu_300Light, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu';
import AppLoading from 'expo-app-loading';
import SvgUri from 'expo-svg-uri';
import { Avatar } from 'react-native-paper';

function VerificationList(props) {
  const [loaded] = useFonts({
    Roboto_700Bold,
    Ubuntu_300Light,
    Ubuntu_500Medium,
  });

  if (!loaded) return <AppLoading />;

  return (
    <View style={styles.row}>
      {/* <SvgUri
        width="55"
        height="55"
        source={{ uri: `https://avatars.dicebear.com/api/human/:${props.user.fullname}.svg` }}
      /> */}
      <Avatar.Image
        size={39}
        source={{
          uri: `https://randomuser.me/api/portraits/men/${props.user.id}.jpg`,
        }}
      />
      <View style={styles.column}>
        <Text style={styles.name}>{props.user.fullname}</Text>
        <Text style={styles.address}>{props.user.address}</Text>
      </View>
      <View style={styles.container_button}>
        <TouchableOpacity onPress={() => props.handleConfirm(props.user.id)} style={styles.btn_confirm}>
          <Text style={styles.confirm}> Confirm </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.handleDecline(props.user)} style={styles.btn_delete}>
          <Text style={styles.delete}> Decline </Text>
        </TouchableOpacity>
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

export default VerificationList;
