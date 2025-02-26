import QRScanner from "../QRScanner";

const HomeQRScanner = ({ isOpen, onClose, onScan }) => {
  return (
    <QRScanner
      onScan={(data) => {
        onScan(data);
        onClose();
      }}
    />
  );
};

export default HomeQRScanner;