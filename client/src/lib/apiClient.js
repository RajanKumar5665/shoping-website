import axios from "axios";

export const API_BASE_URL = "https://shoping-website-81cl.onrender.com";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default apiClient;
