import axios from "axios";
import { SetupInterceptors } from "./Interceptors";

const ApiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

SetupInterceptors(ApiService);

export { ApiService };
