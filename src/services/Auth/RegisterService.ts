import { AxiosInstance } from "axios";
import { RegisterCredentials } from "../../types/services/user";
import { login } from "./LoginService";

const registerUrl = "/cadastrar";

export async function register(
  api: AxiosInstance,
  credentials: RegisterCredentials
): Promise<{ message: string; type: string }> {
  try {
    const response = await api.post(registerUrl, credentials, {
      headers: {
        noAuth: "true",
      },
    });

    if (response.status === 201 || response.status === 200) {
      await login(api, {
        email: credentials.email,
        password: credentials.password,
      });
    }
    let message = response.data.message || "Login realizado.";
    const isError = ![200, 201].includes(response.status);

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
      throw new Error("Erro de rede ao tentar o cadastro.");
    }

    console.error("Erro inesperado:", error.message);
    throw new Error(`Erro ao fazer o registro: ${error.message}`);
  }
}
