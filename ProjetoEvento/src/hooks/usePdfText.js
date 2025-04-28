// usePdfText.js
import { useState } from "react";

export function usePdfText() {
  const [pdfText, setPdfText] = useState("");

  const handleExtractText = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${import.meta.env.VITE_NETWORK_API_LINK}/api/document/extract`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${await response.text()}`);
      }

      const text = await response.text();
      setPdfText(text);
    } catch (error) {
      setPdfText("");
      throw new Error("Erro ao extrair texto do PDF via servidor.");
    }
  };

  return { pdfText, handleExtractText };
}
