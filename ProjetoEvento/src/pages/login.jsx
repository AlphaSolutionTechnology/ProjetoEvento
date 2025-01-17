import { useState, useEffect } from "react";
import googleIcon from "../assets/logo-google.svg";
import linkedinIcon from "../assets/linkedin-icon.png";
import appleIcon from "../assets/apple-logo.svg";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  function handleCredentialResponse(response) {
    console.log("Token JWT recebido:", response.credential);
    fetch("http://localhost:8080/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Usuário autenticado:", data);
      })
      .catch((err) => console.error("Erro na autenticação:", err));
  }

  useEffect(() => {
    window.onload = () => {
      google.accounts.id.initialize({
        client_id: "937916098858-8ekrflam5ad65379jqocah9l2dlrjtrq.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        {
          theme: "outline",
          size: "large",
        }
      );
    };
  }, []);

  return (
    <>
      <div
        className={`min-h-screen w-full flex flex-col justify-center items-center ${
          darkMode ? "bg-black" : "bg-white"
        }`}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg font-semibold shadow-md text-sm sm:text-base lg:text-lg transition-colors duration-300 ${
              darkMode
                ? "bg-gray-200 text-black hover:bg-gray-300"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {darkMode ? "Modo Claro" : "Modo Escuro"}
          </button>
        </div>

        <h1
          className={`${
            darkMode ? "text-white" : "text-black"
          } text-2xl sm:text-3xl lg:text-4xl mb-6 text-center`}
        >
          {isLogin ? "Login" : "Registro"}
        </h1>

        <div className="w-11/12 sm:w-3/4 lg:w-1/2 bg-gray-800 bg-opacity-80 rounded-lg p-6 shadow-lg">
          <form>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-white mb-2">Nome</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite seu nome"
                />
              </div>
            )}
            <div id="g_id_signin" className="mb-4"></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
