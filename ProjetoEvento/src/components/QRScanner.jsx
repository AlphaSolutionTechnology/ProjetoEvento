import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import QrScannedModal from './QrScannedModal';

const QRScanner = () => {
  const videoRef = useRef(null); 
  const [qrCodeData, setQrCodeData] = useState(''); 
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const localId = JSON.parse(localStorage.getItem('user_data')).unique_code;

  const sendConnection = () => {
    fetch("http://localhost:8080/api/connection/sendconnection", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        idSolicitante: localId, 
        idSolicitado: qrCodeData, 
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json(); 
      })
      .then((data) => {
        console.log(data);
        setIsModalOpen(true); // Abre o modal após o envio
      })
      .catch((error) => {
        console.error("Erro ao enviar conexão:", error);
      });
  };

  useEffect(() => {
    let qrScanner;

    if (videoRef.current) {
      qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          setQrCodeData(Number(result.data));
          if (result.data) {
            sendConnection();
          }
        },
        {
          onDecodeError: (err) => {
            console.error(err);
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      qrScanner.start().catch((err) => {
        console.error(err);
        setError('Erro ao acessar a câmera.');
      });
    }

    return () => {
      qrScanner?.destroy();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>QR Code Scanner</h1>
      <video ref={videoRef} style={{ width: '100%', maxWidth: '400px' }}></video>
      <div style={{ marginTop: '20px' }}>
        {qrCodeData ? (
          <div>
            <h3>QR Code Data:</h3>
            <p>{qrCodeData}</p>
          </div>
        ) : (
          <p>Aguardando leitura...</p>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Modal exibido ao escanear e enviar conexão */}
      {isModalOpen && <QrScannedModal />}
    </div>
  );
};

export default QRScanner;
