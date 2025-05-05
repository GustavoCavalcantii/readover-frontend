import { AxiosInstance } from "axios";
import { AuthService } from "../../utils/auth";

const editUrl = "/solicita-email";

export async function requireEmail(
  api: AxiosInstance
): Promise<{ message: string; type: string }> {
  try {
    const payload = {
      email: AuthService.getUser()?.email
    }

    const response = await api.post(editUrl, payload);

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
