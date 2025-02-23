import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuestoes } from "../hooks/useQuestoes";
import AlertToast from "../components/alert/AlertToast";
import QuestoesList from "../components/questoes/QuestoesList";
import CreateQuestoes from "../components/createQuestion/createquestoes";
import QrCode from "react-qr-code";
import QRCodeLink from "qrcode";

function AdmQuiz() {
  const [palestraId, setPalestraId] = useState(null);
  const [showQuestoes, setShowQuestoes] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [codigoPalestra, setCodigoPalestra] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [showQrCodeModal, setShowQrCodeModal] = useState(false); // Estado para controlar o modal do QR Code

  const location = useLocation();
  const { questoes, loadingQuestoes, searchQuestoes, deleteQuestao } =
    useQuestoes(palestraId);

  useEffect(() => {
    const id = location.state?.idPalestra;
    setPalestraId(id || "");

    const codigo = location.state?.codigoPalestra;
    setCodigoPalestra(codigo || "");
    if(codigo) handleDownloadQRCode(codigo);
  }, [location]);

  const showToast = (message, type) => {
    setToast({ open: true, message, type });
    setTimeout(
      () => setToast({ open: false, message: "", type: "success" }),
      3000
    );
  };

  const handleSearchQuestoes = async () => {
    const result = await searchQuestoes();
    if (result) {
      showToast(result.message, result.success ? "success" : "error");
    }
  };

  const handleDeleteQuestao = async (idQuestao) => {
    const result = await deleteQuestao(idQuestao);
    if (result) {
      showToast(result.message, result.success ? "success" : "error");
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % questoes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + questoes.length) % questoes.length);
  };

  const [qrcodeLink, setQRCodeLink] = useState('');

  const handleDownloadQRCode = (link_qrCode) => {
      QRCodeLink.toDataURL(link_qrCode, {
        width: 400,
        margin: 3
      }, function(err, url){
        setQRCodeLink(url);
      })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
        Gerenciar Quizzes da Palestra
      </h1>

      <div className="mb-8 flex gap-4">
        {!showQuestoes ? (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
            onClick={() => {
              setShowQuestoes(true);
              handleSearchQuestoes();
            }}
          >
            Ver Questões
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
            onClick={() => setShowQuestoes(false)}
          >
            Voltar para Criar Questões
          </button>
        )}
      </div>

      {showQuestoes ? (
        <div className="w-full max-w-4xl">
          {loadingQuestoes ? (
            <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
              Carregando questões...
            </p>
          ) : questoes.length === 0 ? (
            <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
              Nenhuma questão encontrada.
            </p>
          ) : (
            <QuestoesList
              questoes={questoes}
              currentSlide={currentSlide}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              deleteQuestao={handleDeleteQuestao}
            />
          )}
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <CreateQuestoes />
        </div>
      )}

      {/* Botão para exibir o QR Code */}
      <div className="mt-8">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
          onClick={() => setShowQrCodeModal(true)}
        >
          Gerar QR Code da Palestra
        </button>
      </div>

      {/* Modal do QR Code */}
      {showQrCodeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              QR Code da Palestra
            </h2>
            <div className="mb-4">
              <QrCode value={codigoPalestra} size={200} />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Código: <span className="font-bold">{codigoPalestra}</span>
            </p>
            <a href={qrcodeLink} download={`qrcode.png`}>Baixar QrCode</a>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
              onClick={() => setShowQrCodeModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* AlertToast */}
      <AlertToast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ open: false, message: "", type: "success" })}
      />
    </div>
  );
}

export default AdmQuiz;
