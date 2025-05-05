import { AxiosInstance } from "axios";
import { LoginCredentials } from "../../types/services/user";
import { AuthService } from "../../utils/auth";

const logoutUrl = "/sair";

export async function logout(
  api: AxiosInstance,
): Promise<{ message: string; type: string }> {
  try {
    const response = await api.post(logoutUrl, {
      headers: {
        noAuth: "true",
      },
    });

    let message = response.data.message || "Logout realizado.";
    const isError = response.status !== 200;

    AuthService.clearAllAuthData();

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
      throw new Error("Erro de rede ao tentar logout.");
    }

    console.error("Erro inesperado:", error.message);
    throw new Error(`Erro inesperado: ${error.message}`);
  }
}
