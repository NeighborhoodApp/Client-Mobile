import Axios from 'axios';

export const axios = Axios.create({
  //   baseURL: 'http://localhost:3000/',
  // baseURL: 'http://192.168.1.12:3000/',
  baseURL: 'http://192.168.8.100:3000/',
  // baseURL: 'http://192.168.43.38:3000/',
  // baseURL: 'http://192.168.1.10:3000/',
});
