import { User } from "../../types/services/user";

const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

const setAccessToken = (token: string): void => {
  localStorage.setItem("access_token", token);
};

const clearAccessToken = (): void => {
  localStorage.removeItem("access_token");
};

const getUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const setUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

const clearUser = (): void => {
  localStorage.removeItem("user");
};

const clearAllAuthData = (): void => {
  clearAccessToken();
  clearUser();
};

const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

export default {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
  getUser,
  setUser,
  clearUser,
  clearAllAuthData,
  isAuthenticated,
};
