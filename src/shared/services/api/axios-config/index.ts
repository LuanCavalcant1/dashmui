import axios from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
    baseURL: 'https://localhost:3333'
});

Api.interceptors.response.use(
    (res) => responseInterceptor(res),
    (error) => errorInterceptor(error),
);

export {Api};