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
        const value = await AsyncStorage.getItem('access_token');
        payloadAxios['headers'] = {
          access_token: value,
        };
      }
      console.log('disini');

      dispatch({ type: option.type + '_LOADING', payload: true });
      const { data } = await axios(payloadAxios);
      console.log(data);
      dispatch({
        type: option.type,
        stage: aption.stage || null,
        payload: option.id ? option.id : option.deletedId ? option.deletedId : data,
      });
    } catch (error) {
      console.log(error);
      console.log('axios', error.stack);
      dispatch({ type: option.type + '_ERROR', payload: error });
    } finally {
      dispatch({ type: option.type + '_LOADING', payload: false });
    }
  };
}
