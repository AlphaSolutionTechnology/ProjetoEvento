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
            setQrCodeData(scannedData); 
            onScan(scannedData); 
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
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-white text-black dark:bg-gray-800 dark:text-white">
      {/* Título responsivo */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-6 text-center font-bold">
        QR Code Scanner
      </h1>
  
      {/* Contêiner de vídeo com tamanhos responsivos */}
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <video
          ref={videoRef}
          className="w-full h-auto border-2 border-gray-300 dark:border-gray-700 rounded-lg shadow-md"
        ></video>
      </div>
  
      {/* Mensagens e resultados */}
      <div className="mt-6 w-full max-w-sm sm:max-w-md lg:max-w-lg text-center">
        {qrCodeData ? (
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">QR Code Data:</h3>
            <p className="mt-2 break-words">{qrCodeData}</p>
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Aguardando leitura...
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-500 bg-red-100 dark:bg-red-900 p-2 rounded-lg">
            {error}
          </p>
        )}
      </div>
    </div>
  );
  
};

export default QRScanner;
