import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'http://192.168.8.101:3000/',
});
