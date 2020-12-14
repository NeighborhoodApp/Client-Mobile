import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  } finally {
    return 'success';
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

// export const getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('@storage_Key');
//     if (value !== null) {
//       // value previously stored
//     }
//   } catch (e) {
//     // error reading value
//   }
// };
