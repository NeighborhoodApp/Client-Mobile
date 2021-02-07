import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'https://tetonggoapi.herokuapp.com/',
  // baseURL: 'http://192.168.8.100:3000/',
  // baseURL: 'https://tetonggo-api.herokuapp.com/',
});
