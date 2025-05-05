import { ApiService } from "../ApiService";

export async function getImageUrl(
  fileName: string | null,
  type: "usuario" | "livro"
): Promise<string | undefined> {
  try {
    if(fileName == null) return;

    let imageUrl = `/livro/imagem/${fileName}`;
    if (type === "usuario") imageUrl = `/usuario/perfil/${fileName}`;

    const response = await ApiService.get(imageUrl, { responseType: "blob" });

    if(response.status !== 200)
      return;

    return URL.createObjectURL(response.data);
  } catch (error) {
    return undefined;
  }
}
