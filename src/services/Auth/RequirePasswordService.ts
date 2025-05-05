import { AxiosInstance } from "axios";
import { AuthService } from "../../utils/auth";
import { RequireCredentials, ResetCredentials } from "../../types/services/user";

const requireUrl = "/solicita-senha";

export async function requirePassword(
  api: AxiosInstance,
  credentials?: RequireCredentials
): Promise<{ message: string; type: string }> {
  try {
    const payload = {
      email: credentials?.email?? AuthService.getUser()?.email
    }

    console.log(payload);

    const response = await api.post(requireUrl, payload);

    let message = response.data.message || "Solicitação enviada com sucesso";
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
      throw new Error("Erro de rede ao enviar solicitação.");
    }

    console.error("Erro inesperado:", error.message);
    throw new Error(`Erro inesperado: ${error.message}`);
  }
}
