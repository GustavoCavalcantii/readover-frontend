import { AxiosInstance } from "axios";
import { EditCredentials } from "../../types/services/user";

const editUrl = "/usuario/editar";

export async function editProfile(
  api: AxiosInstance,
  credentials: EditCredentials
): Promise<{ message: string; type: string }> {
  try {
    const response = await api.put(editUrl, credentials);

    let message = response.data.message || "Editado com sucesso";
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
      throw new Error("Erro de rede ao tentar editar.");
    }

    console.error("Erro inesperado:", error.message);
    throw new Error(`Erro inesperado: ${error.message}`);
  }
}
