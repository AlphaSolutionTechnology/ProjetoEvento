import QRScanner from "../QRScanner";

const HomeQRScanner = ({ onScan, isScannerOpen }) => {
  return (
    <QRScanner
      onScan={(data) => {
        onScan(data);
        onClose();
       }}
       isScannerOpen={isScannerOpen}
    />
  );
};

export default HomeQRScanner;