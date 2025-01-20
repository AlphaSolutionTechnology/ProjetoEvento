import React, { useEffect, useState } from "react";

const AuthButton = ({ platform, clientid, onSuccess, onError, icon, buttonText }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            if (window.google && google.accounts) {
                google.accounts.id.initialize({
                    client_id: clientid,
                    callback: (response) => {
                        setLoading(false); // Define loading como false após a resposta
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
            setLoading(true); // Define loading como true antes de chamar o prompt
            console.log(`Iniciando autenticação do ${platform}...`);
            google.accounts.id.prompt();
        }
    };

    return (
        <button
            onClick={handleSignIn}
            disabled={loading}
            className={`flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded-md shadow-md`}
        >
            {loading ? (
                <span>Loading...</span>
            ) : (
                <>
                    <img src={icon} alt={`Ícone do ${platform}`} className="w-6 h-6" />
                    <span>{buttonText}</span>
                </>
            )}
        </button>
    );
};

export default AuthButton;