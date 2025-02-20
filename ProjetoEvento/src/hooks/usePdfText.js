// usePdfText.js
import { useState } from "react";
import pdfToText from "react-pdftotext";

export function usePdfText() {
  const [pdfText, setPdfText] = useState("");

  const handleExtractText = async (file) => {
    try {
      const text = await pdfToText(file);
      setPdfText(text);
    } catch (error) {
      setPdfText("");
      throw new Error("Erro ao extrair texto do PDF.");
    }
  };

  return { pdfText, handleExtractText };
}