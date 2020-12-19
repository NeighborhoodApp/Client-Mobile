import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  } finally {
    return 'success';
  }
};

export const getUserLogedIn = async () => {
  try {
    const value = await AsyncStorage.getItem('userlogedin');
    if (value) {
      const data = JSON.parse(value);
      return data;
    } else {
      alert('Your session is expired');
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

/**
 *
 * @param {string} key
 * @param {object} obj
 */
export const storeObject = async (key, obj) => {
  try {
    const jsonValue = JSON.stringify(obj);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getDataUser = async () => {
  try {
    const value = await AsyncStorage.getItem('userlogedin');
    const user = JSON.parse(value);
  } catch (e) {
    console.log(e);
  }
};
