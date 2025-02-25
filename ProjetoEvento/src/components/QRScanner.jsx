import React, { useEffect, useRef } from "react";
import QrScanner from "qr-scanner";

const QRScanner = ({ onScan, isScannerOpen }) => {
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && isScannerOpen) {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          if (result?.data) {
            onScan(result.data);
          }
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      qrScannerRef.current = qrScanner;
      qrScanner.start().catch((err) => console.error("Erro ao acessar a câmera:", err));

      return () => {
        qrScanner.stop();
        qrScanner.destroy();

        // 🛑 Para os fluxos da câmera ao desmontar
        if (videoRef.current?.srcObject) {
          const tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach(track => track.stop());
          videoRef.current.srcObject = null;
        }
      };
    } else {
      // 🛑 Para a câmera imediatamente se o scanner for fechado
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
      }

      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [isScannerOpen]); // 🔹 Fecha a câmera ao fechar o modal

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        style={{
          width: "100%", 
          maxWidth: "400px", 
          height: "300px", 
          borderRadius: "8px", 
          border: "1px solid #ccc", 
          objectFit: "cover", 
          margin: "10px"
        }} 
      />
    </div>
  );
};

export default QRScanner;
