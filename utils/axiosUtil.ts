import axios from "axios";

const axiosFunc = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api/v1',
  timeout: 90000,
});

export default axiosFunc;