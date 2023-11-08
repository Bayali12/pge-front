import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.baseURL || 'http://localhost:8081',
});

export default instance;
