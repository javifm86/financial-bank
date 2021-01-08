import axios from 'axios';
import config from '@/config/config';

export default axios.create({
  baseURL: config.api.baseUrl,
  timeout: 8000,
  headers: {
    'Content-type': 'application/json'
  }
});
