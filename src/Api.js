import axios from 'axios';

const API = axios.create({
  baseURL: 'https://custom-print-backend.onrender.com/api'
});
export default API;