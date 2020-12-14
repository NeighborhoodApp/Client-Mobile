import React, { useState }  from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import { Avatar } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

function Discover () {   
    const [selectedValue, setSelectedValue] = useState("public");

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
                    <DropDownPicker
                        items={[
                            {label: 'Public', value: 'public', hidden: true },
                            {label: 'Neighbours of Complex', value: 'complex' },
                        ]}
                        defaultValue={selectedValue}
                        containerStyle={{height: 30, width: '80%', justifyContent: 'center', alignSelf: 'center'}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        // onChangeItem={item => selectedValue({ selectedValue: item.value })}
                    />
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