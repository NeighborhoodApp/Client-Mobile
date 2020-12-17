import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'http://192.168.1.12:3000/',
});
