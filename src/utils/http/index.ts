import axios from 'axios';
import useRequest from './request';
import useResponse from './response';

const http = axios.create({
  baseURL: '/',
  timeout: 5000,
  responseType: 'blob',
});

useRequest.forEach((use) => http.interceptors.request.use(use));
useResponse.forEach((use) => http.interceptors.response.use(use));

export default http;
