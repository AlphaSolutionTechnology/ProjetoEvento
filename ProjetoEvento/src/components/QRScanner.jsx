import React, { useEffect, useRef } from "react";
import QrScanner from "qr-scanner";

const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const onScanRef = useRef(onScan);

  useEffect(() => {
    if (videoRef.current) {
      setTimeout(() => {
        const qrScanner = new QrScanner(
          videoRef.current,
          (result) => {
            if (result?.data) {
              onScanRef.current(result.data);
            }
          },
          {
            highlightScanRegion: true,
            highlightCodeOutline: true,
          }
        );
  
        qrScanner.start().catch((err) => {
          console.error("Erro ao acessar a câmera:", err);
        });
  
        return () => {
          qrScanner.destroy();
        };
      }, 300); // Pequeno atraso para garantir que o <video> existe
    }
  }, []);// Empty dependency array ensures setup runs once

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
          maxWidth: "400px",
          height: "300px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default QRScanner;