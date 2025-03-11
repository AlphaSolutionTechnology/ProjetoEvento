import QRScanner from "../QRScanner";

const HomeModal = ({
  isOpen,
  onClose,
  codigoPalestra,
  setCodigoPalestra,
  onSubmit,
  onScanQR,
}) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Digite o código do evento</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="codigoPalestra" className="sr-only">
          Código da palestra
        </label>
        <input
          id="codigoPalestra"
          type="text"
          value={codigoPalestra}
          onChange={(e) => setCodigoPalestra(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Código da palestra"
        />
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            disabled={!codigoPalestra}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={onScanQR}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Escanear QR Code
          </button>
        </div>
      </form>
    </div>
  );
};

export default HomeModal;