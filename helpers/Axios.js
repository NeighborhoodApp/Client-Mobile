import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'http://192.168.1.8:3000/',
  // baseURL: 'http://192.168.8.100:3000/',
  // baseURL: 'https://tetonggo-api.herokuapp.com/',
});
