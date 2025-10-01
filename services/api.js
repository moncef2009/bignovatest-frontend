import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "https://1096bd2e95eb.ngrok-free.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Intercepteur des requêtes → ajoute l'accessToken
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (userData) =>
    api.post("/auth/register", userData).then((response) => response.data),

  login: (credentials) =>
    api.post("/auth/login", credentials).then((response) => response.data),

  logout: (refreshToken) =>
    api
      .post("/auth/logout", { refreshToken })
      .then((response) => response.data),

  getProfile: () => api.get("/auth/profile").then((response) => response.data),
};

export const doctorsAPI = {
  getDoctors: (filters) =>
    api.get("/doctors", { params: filters }).then((response) => response.data),

  getSpecialties: () =>
    api.get("/doctors/specialties").then((response) => response.data),
};

export default api;
