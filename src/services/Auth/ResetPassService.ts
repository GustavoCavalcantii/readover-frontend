import { AxiosInstance } from "axios";
import { ResetCredentials } from "../../types/services/user";

const requireUrl = "/redefinir-senha";

export async function resetPassword(
  api: AxiosInstance,
  credentials?: ResetCredentials
): Promise<{ message: string; type: string }> {
  try {
    const response = await api.put(requireUrl, credentials, {
      headers: {
        noAuth: "true",
      },
    });

    let message = response.data.message || "Senha redefinida com sucesso";
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
