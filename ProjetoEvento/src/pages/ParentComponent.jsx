import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';

const ParentComponent = () => {
  const [scannedData, setScannedData] = useState('');

  const handleScan = (data) => {
    setScannedData(data); // Atualiza o estado no componente pai
    console.log('QR Code Lido:', data);
  };

  return (
    <div>
      <h1>Componente Pai</h1>
      <p>Dados Lidos: {scannedData || 'Nenhum dado ainda'}</p>
      <QRScanner onScan={handleScan} />
    </div>
  );
};

export default ParentComponent;
