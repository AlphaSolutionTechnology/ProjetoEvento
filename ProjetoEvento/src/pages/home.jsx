import React from "react";
import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";
import useHome from "../hooks/useHome";
import HomeHeader from "../components/home/HomeHeader";
import HomeCard from "../components/home/HomeCard";
import HomeModal from "../components/home/HomeModal";
import HomeQRScanner from "../components/home/HomeQRScanner";
import AlertToast from "../components/alert/AlertToast";
import { UserIcon, ChartBar, Puzzle } from "lucide-react";
import BasicModal from "../components/codigoPalestra/BasicModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const {
    isModalOpen,
    setIsModalOpen,
    isScanning,
    setIsScanning,
    codigoPalestra,
    setCodigoPalestra,
    toastOpen,
    setToastOpen,
    toastType,
    toastMessage,
    validarPalestra,
  } = useHome();

  const retrieveName = (fullname) => {
    if (!fullname) return "";
    const splittedName = fullname.split(" ");
    return splittedName.length > 1
      ? `${splittedName[0]} ${splittedName[1]}`
      : splittedName[0];
  };

  return (
    <main className="flex flex-col justify-start items-center overflow-hidden transition-colors duration-300 p-4">
      {/* Header */}
      <HomeHeader userName={retrieveName(user?.name)} />

      {/* Conteudo principal */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {user?.role === "Administrador" ? (
          <HomeCard
            darkMode={darkMode}
            icon={<ChartBar className="h-12 w-12 text-blue-500 mb-4" />}
            title="Gerencie suas Palestras"
            description="Acesse, edite e organize suas palestras de forma prática."
            buttonText="Acessar Palestras"
            onClick={() => navigate("/palestras")}
          />
        ) : (
          <HomeCard
            darkMode={darkMode}
            icon={<Puzzle className="h-12 w-12 text-blue-500 mb-4" />}
            title="Complete desafios!"
            description="Participe de quizzes, ganhe pontos e desbloqueie conquistas incríveis."
            buttonText="Iniciar Quiz"
            onClick={() => {
              const palestraSalva = localStorage.getItem("palestraAtual");
              if (palestraSalva) {
                navigate(`/palestra/${palestraSalva}`);
              } else {
                setIsModalOpen(true);
              }
            }}
          />
        )}

        <HomeCard
          darkMode={darkMode}
          icon={<UserIcon className="h-12 w-12 text-purple-500 mb-4" />}
          title="Gerencie suas Conexões"
          description="Conecte-se facilmente com outros usuários da plataforma."
          buttonText="Conectar-se a outro usuário"
          onClick={() => navigate("/conectar")}
          buttonColor="purple"
        />
      </section>

      <BasicModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <HomeModal
          codigoPalestra={codigoPalestra}
          setCodigoPalestra={setCodigoPalestra}
          onSubmit={(e) => {
            e.preventDefault();
            validarPalestra(codigoPalestra);
          }}
          onScanQR={() => setIsScanning(true)}
        />
      </BasicModal>

      <BasicModal open={isScanning} onClose={() => setIsScanning(false)}>
        <HomeQRScanner
          onScan={async (data) => {
            await validarPalestra(data);
          }}
          isScannerOpen={isScanning}
        />
      </BasicModal>

      <AlertToast
        open={toastOpen}
        type={toastType}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
    </main>
  );
};

export default Home;