import axios from 'axios';

// ----------------------------------------------------------------------
export interface Headers {
  'Content-Type': string;
  'Access-Control-Allow-Origin'?: string;
  Accept?: string;
}

const headers: Headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};
const axiosInstance = axios.create({ headers });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
