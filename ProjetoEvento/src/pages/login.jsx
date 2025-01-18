import { useState, useEffect } from "react";

function AuthPage() {
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
    const initializeGoogleSignIn = () => {
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

    if (window.google && google.accounts) {
      initializeGoogleSignIn();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className={`min-h-screen flex justify-center items-center ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      <div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded ${
            darkMode ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
          }`}
        >
          {darkMode ? "Modo Claro" : "Modo Escuro"}
        </button>
        <div id="g_id_signin" className="mt-6"></div>
      </div>
    </div>
  );
}

export default AuthPage;
