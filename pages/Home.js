import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function Home({ navigation }) {

  const goGetStarted = () => {
    navigation.replace('GetStarted');
  };
  
  return (
    <View style={styles.container}>
      <Text>Iki halaman Home Cyok</Text>
      <Button title="JOIN US PAGE" onPress={goGetStarted}></Button>
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
});

export default Home;
