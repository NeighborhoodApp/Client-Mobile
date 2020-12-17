import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Loading(params) {
  return (
    <View style={styles.bg}>
      <View style={styles.bg1}>
        <Image style={{ alignSelf: 'center', marginVertical: "80%", width: 100, height: 100 }} source={require('../assets/spinner.gif')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    backgroundColor: '#161C2B',
    width: '100%',
    height: '100%',
    top: 0
  },
  bg1: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    top: 0,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
})