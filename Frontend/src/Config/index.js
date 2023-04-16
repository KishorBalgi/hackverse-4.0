// require('dotenv').config();
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

export default api;
