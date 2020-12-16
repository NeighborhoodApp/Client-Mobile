import AsyncStorage from '@react-native-async-storage/async-storage';
import { axios } from './Axios';

/**
 *
 * @param {url, stage, method, body, headers, type, id} option
 */
export default function callServer(option) {
  const payloadAxios = {
    url: option.url,
    method: option.method || 'GET',
  };

  if (option.body) {
    payloadAxios['data'] = option.body;
  }

  return async (dispatch) => {
    try {
      if (option.headers) {
        const value = await AsyncStorage.getItem('userlogedin');
<<<<<<< HEAD
        const json = JSON.parse(value);
        payloadAxios['headers'] = {
          access_token: json.access_token,
          coordinate: json.coordinate
=======
        const value_after = JSON.parse(value);
        payloadAxios['headers'] = {
          access_token: value_after.access_token,
>>>>>>> 594175e6d9955d1114fde817fdb5ddff63525517
        };
      }
      // console.log('wxios fetch call server', payloadAxios);
      dispatch({ type: option.type + '_LOADING', payload: true });
      const { data } = await axios(payloadAxios);
      // console.log('from server', data);
<<<<<<< HEAD
=======
      console.log(option);
>>>>>>> 594175e6d9955d1114fde817fdb5ddff63525517
      dispatch({
        type: option.type,
        stage: option.stage || null,
        payload: option.id ? option.id : option.deletedId ? option.deletedId : data,
      });
    } catch (error) {
      console.log(error);
      // console.log('axios', error.response || error.message);
      dispatch({
        type: option.type + '_ERROR',
        stage: option.stage || null,
        payload: error.response.data || { msg: 'Somthing error on fetch' },
      });
    } finally {
      dispatch({ type: option.type + '_LOADING', payload: false });
    }
  };
}
