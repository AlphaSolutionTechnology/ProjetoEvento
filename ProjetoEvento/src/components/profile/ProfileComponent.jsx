import { useMessageHandler } from "../../hooks/useMessageHandler";
import ConnectionRequestDialog from "./ConnectionRequestDialog";
import { useConnection } from "../../hooks/useConnection"; 
import React, { useState, useEffect } from "react";
import ConnectionForm from "./ConnectionForm";
import QRScannerModal from "./QRScannerModal";
import AlertToast from "../alert/AlertToast";
import useTheme from "../../hooks/useTheme";
import AvatarSection from "./AvatarSection";
import QRCodeSection from "./QRCodeSection";
import useAuth from "../../hooks/useAuth";
import Loading from "../loading/loading"; 

const ProfileComponent = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const { darkMode } = useTheme();
  const { user, isLoading: authLoading } = useAuth();
  const { handleSendConnection, isLoading, alert: connectionAlert, setAlert: setConnectionAlert } = useConnection(user);
  const { dialogData, isDialogOpen, setIsDialogOpen, alert: messageAlert, setAlert: setMessageAlert } = useMessageHandler();

  // Unifica os alertas
  const alert = connectionAlert.open ? connectionAlert : messageAlert;
  const setAlert = connectionAlert.open ? setConnectionAlert : setMessageAlert;

  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => {
        setAlert({ open: false, message: "", type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (authLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Você não está autenticado. Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-opacity-30 backdrop-blur-lg rounded-2xl border border-opacity-20 shadow-2xl dark:bg-black dark:bg-opacity-30 dark:border-black dark:border-opacity-20 max-w-lg mx-auto relative">
      <AvatarSection userData={user} darkMode={darkMode} />

      <section className="flex justify-center mb-4">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => setActiveTab(0)}
                className={`relative px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTab === 0
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 border-b-2 border-transparent hover:border-blue-600"
                }`}
              >
                Meu QR Code
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab(1)}
                className={`relative px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTab === 1
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 border-b-2 border-transparent hover:border-blue-600"
                }`}
              >
                Conectar
              </button>
            </li>
          </ul>
        </nav>
      </section>

      {activeTab === 0 && <QRCodeSection userData={user} darkMode={darkMode} />}
      {activeTab === 1 && (
        <ConnectionForm
          darkMode={darkMode}
          setIsScannerOpen={setIsScannerOpen}
          inputCode={inputCode}
          setInputCode={setInputCode}
          handleSendConnection={handleSendConnection}
        />
      )}
      <QRScannerModal
        isScannerOpen={isScannerOpen}
        setIsScannerOpen={setIsScannerOpen}
        handleScan={(data) => {
          setIsScannerOpen(false); // Fecha o scanner após a leitura
          setInputCode(data);
          handleSendConnection(data);
        }}
        darkMode={darkMode}
      />

      <ConnectionRequestDialog
        fromUserName={dialogData.fromUserName}
        fromUserCode={dialogData.fromUserCode}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      <AlertToast
        open={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ open: false, message: "", type: "" })}
      />
    </div>
  );
};

export default ProfileComponent;