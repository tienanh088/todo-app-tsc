import axios from "axios";

const baseUrl = process.env.REACT_APP_API_ENDPOINT;

const axiosConfig = axios.create({
  baseURL: baseUrl,
  timeout: 10000
});

export default axiosConfig;
