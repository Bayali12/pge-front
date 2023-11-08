import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pge-back.onrender.com',
});

export default instance;
