import { AxiosInstance } from "axios";
import { User } from "../../types/services/user";

const editUrl = "/usuario/minha-conta";

export async function getUserInfo(api: AxiosInstance): Promise<User> {
  try {
    const response = await api.get(editUrl);

    const { id, username, email, grade, role, profileImage } =
      response.data.data;

    const userData = {
      id,
      username,
      email,
      role,
      grade,
      image: profileImage,
    };

    return userData;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response?.data?.message);
    }

    if (error.request) {
      console.error("Erro de rede:", error.request);
      throw new Error("Erro de rede ao tentar editar.");
    }

    console.error("Erro inesperado:", error.message);
    throw new Error(`Erro inesperado: ${error.message}`);
  }
}
