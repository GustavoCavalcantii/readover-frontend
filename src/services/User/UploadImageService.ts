import { AxiosInstance } from "axios";
import imageCompression from "browser-image-compression";

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-z0-9.\-_]/gi, "_");
}

export async function uploadImage(
  api: AxiosInstance,
  file: File
): Promise<string> {
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    });

    const sanitizedFileName = sanitizeFileName(
      compressedFile.name || file.name
    );
    const renamedFile = new File([compressedFile], sanitizedFileName, {
      type: compressedFile.type,
    });

    const formData = new FormData();
    formData.append("image", renamedFile);

    const response = await api.post("/usuario/enviar-perfil", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.filename;
  } catch (error) {
    console.error("Erro ao enviar imagem:", error);
    throw error;
  }
}
