import React, { useState }  from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import { Avatar } from 'react-native-paper';


function Discover () {   
    const [selectedValue, setSelectedValue] = useState("java");

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Avatar.Image size={55}
                    source={{
                        uri: 'https://ath2.unileverservices.com/wp-content/uploads/sites/3/2017/07/black-men-haircuts-afro-natural-hair-683x1024.jpg',
                    }}
                />
                <View style={styles.column}>
                    <Text style={styles.name}>Bambang Gentolet</Text>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        itemStyle={{ backgroundColor: "grey", color: "blue", fontSize:17 }}
                        // textStyle={{ fontSize: 2 }}
                    >
                        <Picker.Item label="Public" value="Public" style={styles.size} />
                        <Picker.Item label="Neighbours of Complex" value="Complex" />
                    </Picker>
                </View>
            </View>
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
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    name: {
        marginLeft: 20
    },
    picker: {
        height: 50, 
        width: 250,
        marginLeft: 10,
        fontSize: 4
    },
    size: {
        fontSize: 5
    }

});
  

export default Discover