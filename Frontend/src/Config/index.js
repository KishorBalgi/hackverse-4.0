// require('dotenv').config();
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  withCredentials: true,
});

export default api;
