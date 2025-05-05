export const removeTransparency = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
  
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject("Canvas context is null");
  
          // Preenche com fundo branco
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
  
          canvas.toBlob((blob) => {
            if (blob) {
              const cleanFile = new File([blob], file.name, { type: "image/png" });
              resolve(cleanFile);
            } else {
              reject("Erro ao gerar nova imagem");
            }
          }, "image/png");
        };
        img.src = reader.result as string;
      };
  
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };  