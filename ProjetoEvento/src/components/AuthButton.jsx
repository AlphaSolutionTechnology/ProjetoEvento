import React, { useEffect } from "react";

const AuthButton = ({ platform, clientid, onSuccess, onError, icon, buttonText }) => {
    useEffect(() => {
        const initializeGoogleSignIn = () => {
            if (window.google && google.accounts) {
                google.accounts.id.initialize({
                    client_id: clientid,
                    callback: (response) => {
                        console.log("Token JWT recebido:", response.credential);
                        if (response.credential) {
                            fetch(`http://localhost:8080/auth/${platform}`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ token: response.credential }),
                            })
                                .then((res) => res.json())
                                .then((data) => {
                                    console.log("Usuário autenticado:", data);
                                    onSuccess(data);
                                })
                                .catch((err) => {
                                    console.error("Erro na autenticação:", err);
                                    onError(err);
                                });
                        } else {
                            console.error("Nenhum token recebido!");
                        }
                    },
                });
                google.accounts.id.prompt();
                console.log("Google Sign-In inicializado!");
            } else {
                console.error("Google Sign-In não inicializado!");
            }
        };

        if (!window.google || !google.accounts) {
            const script = document.createElement("script");
            script.src = `https://accounts.google.com/gsi/client?client_id=${clientid}`;
            script.async = true;
            script.defer = true;
            script.onload = initializeGoogleSignIn;
            document.body.appendChild(script);
        } else {
            initializeGoogleSignIn();
        }
    }, [platform, clientid, onSuccess, onError]);

    const handleSignIn = () => {
        if (window.google && google.accounts) {
            console.log(`Iniciando autenticação do ${platform}...`);
            google.accounts.id.prompt();
        }
    };

    return (
        <button
            onClick={handleSignIn}
            className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded-md shadow-md"
        >
            <img src={icon} alt={`Ícone do ${platform}`} className="w-6 h-6" />
            <span>{buttonText}</span>
        </button>
    );
}
export default AuthButton;