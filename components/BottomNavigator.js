import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Text, Alert } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';

export default function BottomNavigator({ currentPage, navigation, submitHandler }) {
  const getColor = (page) => {
    let color = 'black';
    if (currentPage === page) {
      return '#2FBBF0';
    }
    return color;
  };
  return (
    <>
      <View style={styles.outerCircle}>
        {/* <TouchableWithoutFeedback onPress={props.submitHandler}>
					<View style={[styles.button, styles.actionBtn]}>
						<FontAwesome name="plus" size={18} color="white" />
					</View>
				</TouchableWithoutFeedback> */}
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={submitHandler}>
            <FontAwesome name="plus" size={30} color="#2FBBF0" style={{ marginTop: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
      {/* >>>>>>> BOX NAVIGATOR <<<<< */}
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          border: 2,
          radius: 3,
          shadowOpacity: 0,
          shadowRadius: 3,
          shadowOffset: {
            height: 1,
            width: 1,
          },
          x: 0,
          y: 0,
          style: { marginVertical: 5 },
          bottom: 0,
          width: '100%',
          height: 70,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 25,
          borderWidth: 0.5,
        }}
      >
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Discover');
            }}
          >
            <MaterialIcons name="home" size={26} color={getColor('Home')} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EventCalendar');
            }}
          >
            <Ionicons name="calendar-outline" size={24} color={getColor('EventCalendar')} />
          </TouchableOpacity>
        </View>

        <View
          style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginStart: 80 }}
        >
          <TouchableOpacity
            onPress={() => {
              Alert.alert('click');
            }}
            style={{ marginTop: 10 }}
          >
            <Ionicons name="ios-notifications-outline" size={24} color={getColor('Notification')} />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Tetonggo');
            }}
            style={{ marginBottom: 14 }}
          >
            <AntDesign name="user" size={24} color={getColor('Tetonggo')} />
          </TouchableOpacity>
        </View>

        {/* </View> */}
      </View>
    </>
  );
}


const styles = StyleSheet.create({
	MainContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'blue'
	},
	outerCircle: {
		elevation: 9,
		position: 'absolute',
		alignSelf: 'center',
		backgroundColor: 'white',
		width: 50,
		height: 50,
		borderRadius: 35,
		bottom: 35,
	},
	button: {
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: 'grey',
		shadowOpacity: 0.1,
		shadowOffset: { x: 2, y: 0 },
		shadowRadius: 2,
		borderRadius: 30,
		position: 'absolute',
		bottom: 20,
		right: 0,
		top: 5,
		left: 5,
		shadowOpacity: 5.0,

	},
	actionBtn: {
		backgroundColor: 'white',
		textShadowOffset: { width: 5, height: 5 },
		textShadowRadius: 10,
		borderWidth: 2,
		borderColor: '#fff'
	}
});
