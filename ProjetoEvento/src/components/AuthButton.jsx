import React, { useEffect, useState } from "react";

const AuthButton = ({ platform, onSuccess, onError, icon, buttonText }) => {
    const [loading, setLoading] = useState(false);
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    useEffect(() => {
        const loadGoogleSignIn = () => {
            if (!window.google || !google.accounts) {
                const script = document.createElement("script");
                script.src = "https://accounts.google.com/gsi/client";
                script.async = true;
                script.defer = true;
                script.onload = initializeGoogleSignIn;
                document.body.appendChild(script);
            } else {
                initializeGoogleSignIn();
            }
        };

        const initializeGoogleSignIn = () => {
            if (window.google && google.accounts) {
                google.accounts.id.initialize({
                    client_id: clientId,
                    callback: handleCredentialResponse,
                });
                console.log("Google Sign-In initialized!");
            } else {
                console.error("Google Sign-In failed to initialize!");
            }
        };

        const handleCredentialResponse = (response) => {
            setLoading(false);
            if (response.credential) {
                authenticateWithBackend(response.credential);
            } else {
                console.error("No token received!");
                onError("No token received.");
            }
        };

        const authenticateWithBackend = async (token) => {
            try {
                const res = await fetch("http://localhost:8080/api/auth/google", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });
                const data = await res.json();
                if (res.ok) {
                    console.log("User authenticated:", data);
                    onSuccess(data);
                } else {
                    console.error("Authentication failed:", data);
                    onError(data);
                }
            } catch (error) {
                console.error("Authentication error:", error);
                onError(error);
            }
        };

        loadGoogleSignIn();
    }, [platform, clientId, onSuccess, onError]);

    const handleSignIn = () => {
        if (window.google && google.accounts) {
            setLoading(true);
            google.accounts.id.prompt();
        } else {
            console.error("Google Sign-In not initialized.");
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
