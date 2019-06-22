import axios from 'axios';

const baseClient = axios.create({
  baseURL: '/',
  timeout: 30000
});

export default baseClient;
