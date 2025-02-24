import React, { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { UserIcon, ChartBar } from "lucide-react";
import BasicModal from "../components/codigoPalestra/BasicModal";
import QRScanner from "../components/QRScanner";
import AlertToast from "../components/alert/AlertToast"; // Alertas

function Home() {
  const { darkMode } = useTheme();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [codigoPalestra, setCodigoPalestra] = useState("");

  // Estados para controlar o AlertToast
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");

  const retrieveName = (fullname) => {
    if (!fullname) return "";
    const splittedName = fullname.split(" ");
    return splittedName.length > 1
      ? `${splittedName[0]} ${splittedName[1]}`
      : splittedName[0];
  };

  useEffect(() => {
    if (!isLoading) {
      setIsPageLoading(false);
    }
  }, [isLoading]);

  if (isPageLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Carregando página...
      </div>
    );
  }

  const validarPalestra = async (codigo) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_NETWORK_API_LINK}
/api/palestra/inscrever/${codigo}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Palestra não encontrada");

      const data = await response.json();
      const idPalestra = data.idPalestra;

      if (!idPalestra) throw new Error("ID da Palestra não encontrado!");

      NETWORKStorage.setItem("palestraAtual", idPalestra);

      // Exibe toast de sucesso
      setToastType("success");
      setToastMessage("Palestra encontrada com sucesso!");
      setToastOpen(true);

      // Redireciona após 2 segundos
      setTimeout(() => {
        navigate(`/palestra/${idPalestra}`);
      }, 2000);
    } catch (error) {
      // Exibe toast de erro
      setToastType("error");
      setToastMessage(
        "Palestra inválida ou não encontrada. Verifique o código."
      );
      setToastOpen(true);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden transition-colors duration-300">
      {/* Título */}
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl mb-4 text-center font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Bem-vindo, {retrieveName(user?.name)}!
      </motion.h1>
      <p className="text-base sm:text-lg text-gray-400 mb-6">
        O que você gostaria de fazer hoje?
      </p>

      <section
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl`}
      >
        {/* Se for administrador, mostrar "Gerencie suas Palestras" */}
        {user?.role === "Administrador" ? (
          <motion.div
            className={`p-6 rounded-2xl shadow-xl ${
              darkMode
                ? "bg-gray-800 bg-opacity-70 backdrop-blur-lg border-gray-700"
                : "bg-white bg-opacity-70 backdrop-blur-lg border-gray-200"
            } border flex flex-col items-center text-center`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <ChartBar className="h-12 w-12 text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
              Gerencie suas Palestras
            </h2>
            <p className="text-gray-400 mb-4">
              Acesse, edite e organize suas palestras de forma prática.
            </p>
            <button
              onClick={() => navigate("/palestras")}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition duration-300"
            >
              Acessar Palestras
            </button>
          </motion.div>
        ) : (
          <motion.div
            className={`p-6 rounded-2xl shadow-xl ${
              darkMode
                ? "bg-gray-800 bg-opacity-70 backdrop-blur-lg border-gray-700"
                : "bg-white bg-opacity-70 backdrop-blur-lg border-gray-200"
            } border flex flex-col items-center text-center`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <ChartBar className="h-12 w-12 text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
              Entrar em palestra
            </h2>
            <p className="text-gray-400 mb-4">
              Cadastre-se, acesse suas palestras e quizzes de forma prática.
            </p>
            <button
              onClick={() => {
                const palestraSalva = NETWORKStorage.getItem("palestraAtual");
                if (palestraSalva) {
                  navigate(`/palestra/${palestraSalva}`);
                } else {
                  setIsModalOpen(true);
                }
              }}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition duration-300"
            >
              Acessar Palestra
            </button>
          </motion.div>
        )}

        {/* Modal para entrada de código */}
        <BasicModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">
              Digite o código da palestra
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                validarPalestra(codigoPalestra);
              }}
            >
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
                  onClick={() => setIsScanning(true)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Escanear QR Code
                </button>
              </div>
            </form>
          </div>
        </BasicModal>

        {/* Modal de Scanner de QR Code */}
        <BasicModal open={isScanning} onClose={() => setIsScanning(false)}>
          <QRScanner
            onScan={async (data) => {
              setIsScanning(false);
              await validarPalestra(data);
            }}
          />
        </BasicModal>

        {/* Card de Conexões (Disponível para todos os usuários) */}
        <motion.div
          className={`p-6 rounded-2xl shadow-xl ${
            darkMode
              ? "bg-gray-800 bg-opacity-70 backdrop-blur-lg border-gray-700"
              : "bg-white bg-opacity-70 backdrop-blur-lg border-gray-200"
          } border flex flex-col items-center text-center`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <UserIcon className="h-12 w-12 text-purple-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
            Gerencie suas Conexões
          </h2>
          <p className="text-gray-400 mb-4">
            Conecte-se facilmente com outros usuários da plataforma.
          </p>
          <button
            onClick={() => navigate("/conectar")}
            className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-xl shadow-md hover:bg-purple-600 transition duration-300"
          >
            Conectar-se a outro usuário
          </button>
        </motion.div>
      </section>

      {/* AlertToast */}
      <AlertToast
        open={toastOpen}
        type={toastType}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
    </main>
  );
}

export default Home;
