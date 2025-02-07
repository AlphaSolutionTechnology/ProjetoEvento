import React, { useEffect, useRef } from "react";
import QrScanner from "qr-scanner";

const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          if (result?.data) {
            onScan(result.data); // Passa o dado lido para o callback
          }
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        },
      );

      qrScanner.start().catch((err) => {
        console.error("Erro ao acessar a câmera:", err);
      });

      return () => {
        qrScanner.destroy();
      };
    }
  }, [onScan]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <video
        ref={videoRef}
        style={{
          width: "100%",
          maxWidth: "400px", // Largura máxima
          height: "300px", // Altura fixa para o vídeo
          borderRadius: "8px", // Bordas arredondadas
          border: "1px solid #ccc", // Adiciona uma borda
          objectFit: "cover", // Ajusta a imagem para preencher o contêiner
        }}
      />
    </div>
  );
};

export default QRScanner;
