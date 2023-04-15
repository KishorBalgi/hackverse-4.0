// require('dotenv').config();
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  withCredentials: true,
});

console.log(process.env.REACT_APP_BASEURL);

export default api;
