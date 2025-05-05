import { AxiosInstance } from "axios";
import { AuthService } from "../../utils/auth";
import { LoginCredentials } from "../../types/services/user";

const loginUrl = "/entrar";

export async function login(
  api: AxiosInstance,
  credentials: LoginCredentials
): Promise<{ message: string; type: string }> {
  try {
    const response = await api.post(loginUrl, credentials, {
      headers: {
        noAuth: "true",
      },
    });

    const token = response.data?.token || response.data?.data?.token;

    if (token) {
      AuthService.setAccessToken(token);
    }

    const { id, username, email, role, image } = response.data.data;

    const userData = {
      id,
      username,
      email,
      role,
      image,
    };
    AuthService.setUser(userData);

    let message = response.data.message || "Login realizado.";
    const isError = response.status !== 200;

    return { message, type: isError ? "danger" : "success" };
  } catch (error: any) {
    if (error.response?.data?.message) {
      return {
        message: error.response.data.message,
        type: "danger",
      };
    }

    if (error.request) {
      console.error("Erro de rede:", error.request);
      throw new Error("Erro de rede ao tentar login.");
    }

    console.error("Erro inesperado:", error.message);
    throw new Error(`Erro inesperado: ${error.message}`);
  }
}
