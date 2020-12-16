import AsyncStorage from '@react-native-async-storage/async-storage';
import { axios } from '../helpers/Axios';

export const verifyUser = async (expoPushToken) => {
  console.log('expoPushToken', expoPushToken);
  if (expoPushToken.length > 0) {
    try {
    } catch (error) {
      console.log(error);
    }
    const value = await AsyncStorage.getItem('userlogedin');
    const json = JSON.parse(value);
    console.log(json, 'json');
    if (json) {
      const { data } = await axios({
        url: 'users/verify/' + json.id,
        method: 'PUT',
        data: {
          expoPushToken: expoPushToken,
        },
        headers: {
          access_token: json.access_token,
        },
      });
      for (const key in data.user) {
        if (data.user.hasOwnProperty(key)) {
          json[key] = data.user[key];
        }
      }
      json.expoPushToken = expoPushToken;
      await AsyncStorage.setItem('userlogedin', JSON.stringify(json));
    }
    console.log(data, 'verify');
    return data;
  }
};
