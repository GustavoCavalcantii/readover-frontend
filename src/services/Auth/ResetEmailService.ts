import { AxiosInstance } from "axios";
import { ResetCredentials } from "../../types/services/user";

const requireUrl = "/redefinir-email";

export async function resetEmail(
  api: AxiosInstance,
  credentials?: ResetCredentials
): Promise<{ message: string; type: string }> {
  try {
    const response = await api.put(requireUrl, credentials);

    let message = response.data.message || "Email redefinido com sucesso";
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
