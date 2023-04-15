// require('dotenv').config();
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_BASEURL
});

export default api;
