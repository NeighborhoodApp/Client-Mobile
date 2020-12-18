import AsyncStorage from '@react-native-async-storage/async-storage';
import { axios } from './Axios';

/**
 *
 * @param {url, stage, method, body, headers, type, id} option
 */
export default function callServerV2(option) {
  const payloadAxios = {
    url: option.url,
    method: option.method || 'GET',
  };

  if (option.body) {
    payloadAxios['data'] = option.body;
  }
  
  if (option.headers) {
    payloadAxios['headers'] = option.headers;
  }

  return async (dispatch) => {
    try {
      dispatch({ type: option.type + '_LOADING', payload: true });
      dispatch({ type: option.type + '_ERROR', payload: null });

      const { data } = await axios(payloadAxios);

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
        payload: error.response || { msg: 'Somthing error on fetch' },
      });
    } finally {
      dispatch({ type: option.type + '_LOADING', payload: false });
    }
  };
}
