import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuestoes } from "../hooks/useQuestoes";
import AlertToast from "../components/alert/AlertToast";
import QuestoesList from "../components/questoes/QuestoesList";
import CreateQuestoes from "../components/createQuestion/createquestoes";
import QrCode from "react-qr-code";
import QRCodeLink from "qrcode";
import { motion, AnimatePresence } from "framer-motion"; // Importações do Framer Motion
import { Download, X, ArrowLeft, ArrowRight, Eye, Plus } from "lucide-react"; // Ícones do Lucide
import QuizControls from "../components/QuizControls";

function AdmQuiz() {
  const [palestraId, setPalestraId] = useState(null);
  const [showQuestoes, setShowQuestoes] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [codigoPalestra, setCodigoPalestra] = useState("");
  const [horaLiberacao, setHoraLiberacao] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [showQrCodeModal, setShowQrCodeModal] = useState(false);
  const [qrcodeLink, setQRCodeLink] = useState("");

  const location = useLocation();
  const { questoes, loadingQuestoes, searchQuestoes, deleteQuestao } =
    useQuestoes(palestraId);

  useEffect(() => {
    const id = location.state?.idPalestra;
    setPalestraId(id || "");

    const codigo = location.state?.codigoPalestra;
    setCodigoPalestra(codigo || "");
    if (codigo) handleDownloadQRCode(codigo);
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

  const handleDownloadQRCode = (link_qrCode) => {
    QRCodeLink.toDataURL(
      link_qrCode,
      {
        width: 400,
        margin: 3,
      },
      function (err, url) {
        setQRCodeLink(url);
      }
    );
  };


  const liberarQuizz = async (agora) => {
    setLoading(true);
    
    try {
      let formattedHoraLiberacao = null;
    
    if (!agora) {
      const data = new Date(horaLiberacao);
      data.setHours(data.getHours() - data.getTimezoneOffset() / 60); // ajusta corretamente o time zone
      formattedHoraLiberacao = data.toISOString().slice(0, 19).replace("T", " ");
    }

      const response = await fetch(`${import.meta.env.VITE_LOCAL_API_LINK}/api/palestra/liberar`, {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ palestraId, horaProgramada: formattedHoraLiberacao}),
      });
      if (response.ok) {
        showToast( agora ? "Quiz liberado agora!":  "Quiz será liberado na hora programada!", "success");
      } else {
        showToast("Erro ao liberar quiz. 1", "error");
      }
    } catch (error) {
      showToast("Erro ao liberar quiz agora.", "error");
    } finally {
      setLoading(false);
    }
  };

  //libera imediatamente
  const liberarQuizAgora = () => liberarQuizz(true);
  //libera no horário programado
  const liberarQuizProgramado = () => liberarQuizz(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
        Gerenciar Quizzes da Palestra
      </h1>

      <div className="mb-8 flex gap-4">
        {!showQuestoes ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
            onClick={() => {
              setShowQuestoes(true);
              handleSearchQuestoes();
            }}
          >
            <Eye size={18} /> Ver Questões
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
            onClick={() => setShowQuestoes(false)}
          >
            <ArrowLeft size={18} /> Voltar para Criar Questões
          </motion.button>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full max-w-4xl"
        >
          <CreateQuestoes />
        </motion.div>
      )}

      {/* Botão para exibir o QR Code */}
      <div className="mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
          onClick={() => setShowQrCodeModal(true)}
        >
          <Plus size={18} /> Gerar QR Code da Palestra
        </motion.button>
      </div>

      {/* Modal do QR Code */}
      <AnimatePresence>
        {showQrCodeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-sm"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                QR Code da Palestra
              </h2>
              <div className="mb-4 flex justify-center">
                <QrCode value={codigoPalestra} size={200} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Código: <span className="font-bold">{codigoPalestra}</span>
              </p>
              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = qrcodeLink;
                    link.download = "qrcode.png";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download size={18} /> Baixar QR Code
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center gap-2"
                  onClick={() => setShowQrCodeModal(false)}
                >
                  <X size={18} /> Fechar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
        <div className="mt-12">
          <QuizControls
            liberarQuizAgora={liberarQuizAgora}
            liberarQuizProgramado={liberarQuizProgramado}
            loading={loading}
            horaLiberacao={horaLiberacao}
            setHoraLiberacao={setHoraLiberacao}
          />
        </div>
      </AnimatePresence>

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
