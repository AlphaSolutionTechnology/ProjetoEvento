import React, { useEffect } from 'react';

const GoogleSignIn = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!googleClientId) {
      console.error("Google Client ID não foi configurado no .env.");
      return;
    }


    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeGoogleSignIn = () => {
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      { theme: "outline", size: "large" }
    );
  };

  const handleCredentialResponse = (response) => {
    console.log("Token JWT recebido:", response.credential);

    fetch("http://localhost:8080/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      credentials:"include",
      
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Resposta do backend:", data);
      })
      .catch((error) => {
        console.error("Erro ao enviar token para o backend:", error);
      });
  };

  return (
    <div>
      <div id="googleSignInButton"></div>
    </div>
  );
};

export default GoogleSignIn;
