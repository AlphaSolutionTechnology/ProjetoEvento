// src/components/AuthPage.js
import React from 'react';
import googleIcon from '../assets/logo-google.svg'; // Importar o ícone do Google
import linkedinIcon from '../assets/linkedin-icon.png'; // Importar o ícone do LinkedIn
import appleIcon from '../assets/apple-logo.svg'; // Importar o ícone da Apple
import AuthButton from '../components/AuthButton'; // Importar o componente AuthButton

const AuthPage = () => {
    const handleAuthSuccess = (data) => {
        console.log("Usuário autenticado com sucesso:", data);
    };

    const handleAuthError = (err) => {
        console.error("Erro na autenticação:", err);
    };

    return (
        <div>
            <AuthButton
                platform="google"
                clientid="937916098858-8ekrflam5ad65379jqocah9l2dlrjtrq.apps.googleusercontent.com"
                onSuccess={handleAuthSuccess}
                onError={handleAuthError}
                icon={googleIcon}
                buttonText="Entrar com Google"
            />
            <AuthButton
                platform="linkedin"
                clientid="78v1z2j1w0v8e8"
                onSuccess={handleAuthSuccess}
                onError={handleAuthError}
                icon={linkedinIcon}
                buttonText="Entrar com LinkedIn"
            />
            <AuthButton
                platform="apple"
                clientid="com.example.apple"
                onSuccess={handleAuthSuccess}
                onError={handleAuthError}
                icon={appleIcon}
                buttonText="Entrar com Apple"
            />

        </div>
    );
}
export default AuthPage;
