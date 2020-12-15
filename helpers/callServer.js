import AsyncStorage from '@react-native-async-storage/async-storage';
import { axios } from './Axios';

/**
 *
 * @param {url, stage, method, body, headers, type} option
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
        payloadAxios['headers'] = {
          access_token: value.access_token,
        };
      }

      console.log('wxios fetch call server', payloadAxios);
      dispatch({ type: option.type + '_LOADING', payload: true });
      const { data } = await axios(payloadAxios);
      // console.log('from server', data);
      dispatch({
        type: option.type,
        stage: option.stage || null,
        payload: option.id ? option.id : option.deletedId ? option.deletedId : data,
      });
    } catch (error) {
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
