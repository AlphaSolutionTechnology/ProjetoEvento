import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const [qrCodeData, setQrCodeData] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (videoRef.current) {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          if (!qrCodeData) {
            const scannedData = result.data;
            setQrCodeData(scannedData); // Atualiza o estado local
            onScan(scannedData); // Envia o valor para o pai
          }
        },
        {
          onDecodeError: (err) => {
            console.warn('Erro ao decodificar QR Code:', err);
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      qrScanner.start().catch((err) => {
        console.error(err);
        setError('Erro ao acessar a câmera.');
      });

      return () => {
        qrScanner.destroy();
      };
    }
  }, [qrCodeData, onScan]); // Inclua onScan nas dependências para garantir que ele esteja atualizado

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
    </div>
  );
};

export default QRScanner;
