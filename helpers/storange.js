import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserLogedIn = async () => {
  try {
    const value = await AsyncStorage.getItem('userlogedin');
    if (value) {
      const data = JSON.parse(value);
      return data;
    } else {
      // alert('Your session is expired');
      return {};
    }
  } catch (e) {
    return {};
  }
};

export const setUserLogedIn = async (user) => {
  try {
    await AsyncStorage.setItem('userlogedin', JSON.stringify(user));
    return 'saved'
  } catch (e) {
    return 'failed message: ' + e.stack;
  }
};
