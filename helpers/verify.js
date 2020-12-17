import AsyncStorage from '@react-native-async-storage/async-storage';
import { axios } from '../helpers/Axios';
import errorHandler from './errorHandler';

export const verifyUser = async (expoPushToken) => {
  if (expoPushToken.length > 0) {
    try {
      const value = await AsyncStorage.getItem('userlogedin');
      const json = JSON.parse(value);
      let response;
      console.log(json, 'json');
      if (json) {
        response = await axios({
          url: 'users/verify/' + json.id,
          method: 'PUT',
          data: {
            expoPushToken: expoPushToken,
          },
          headers: {
            access_token: json.access_token,
          },
        });
        console.log(response)
        // for (const key in response.data.user) {
        //   if (response.data.user.hasOwnProperty(key)) {
        //     json[key] = response.data.user[key];
        //   }
        // }
        // json.expoPushToken = expoPushToken;
        // await AsyncStorage.setItem('userlogedin', JSON.stringify(json));
      }
    } catch (error) {
      const msg = errorHandler(error);
      console.log(msg);
    }
    

    return response.data;
  }
};
