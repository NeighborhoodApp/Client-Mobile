import React  from 'react'
import { View, Text, StyleSheet } from 'react-native'

function PickLocation () {    
    return (
        <View style={styles.container}>
            <Text>Iki halaman PickLocation Cyok</Text>
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
});
  

export default PickLocation