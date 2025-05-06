import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { AuthService } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const refreshUrl = "/refresh";
const loginUrl = "/auth";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export function SetupInterceptors(api: AxiosInstance) {
  api.defaults.withCredentials = true;

  const navigate = useNavigate();

  let isRefreshing = false;
  let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (error: unknown) => void;
  }[] = [];

  const processQueue = (error: unknown, token: string | null) => {
    failedQueue.forEach((prom) => {
      if (token) {
        prom.resolve(token);
      } else {
        prom.reject(error);
      }
    });
    failedQueue = [];
  };

  const GetToken = async (): Promise<string | null> => {
    try {
      const response = await api.post(
        refreshUrl,
        {},
        {
          headers: {
            noAuth: "true",
          },
        }
      );

      const token = response.data?.data?.token || null;

      if (token) {
        AuthService.setAccessToken(token);
        return token;
      }

      console.warn("Nenhum token retornado do endpoint de refresh.");
      return null;
    } catch (error) {
      console.error("Erro ao renovar token:", error);
      return null;
    }
  };

  api.interceptors.request.use(
    (config) => {
      const token = AuthService.getAccessToken();

      if (token && config.headers?.noAuth !== "true") {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (config.headers?.noAuth === "true") {
        delete config.headers.noAuth;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      const isUnauthorized =
        error.response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest.headers?.noAuth !== "true";

      if (isUnauthorized) {
        console.log("Tentando renovar o token...");
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token) => {
                if (typeof token === "string") {
                  originalRequest.headers = originalRequest.headers || {};
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                  resolve(api(originalRequest));
                } else {
                  reject("Token inválido");
                }
              },
              reject,
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await GetToken();

          if (newToken) {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            processQueue(null, newToken);
            return api(originalRequest);
          } else {
            processQueue(new Error("Falha ao renovar token"), null);
            if (typeof window !== "undefined") {
              AuthService.clearAllAuthData();
              navigate(loginUrl);
            }
            return Promise.reject(error);
          }
        } catch (err) {
          processQueue(err, null);
          if (typeof window !== "undefined") {
            AuthService.clearAllAuthData();
            navigate(loginUrl);
          }
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      if (error.response?.status === 500) {
        console.error("Erro interno no servidor:", error.response.data);
      }

      return Promise.reject(error);
    }
  );
}
