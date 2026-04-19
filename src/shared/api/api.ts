import axios from "axios";
import { configureAuthInterceptors } from "../../features/auth/http/auth-interceptors.service";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

configureAuthInterceptors(api);

export { api };
