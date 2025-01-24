// Componente HomePalestrante
import React from 'react';
import PalestrasList from '../pages/palestrasList';

const HomePalestrante = () => {
    return (
        <div>
            <h1 className="text-center text-2xl font-bold my-4">Bem-vindo ao Painel do Palestrante</h1>
            <div className="palestras-section">
                <h2 className="text-xl font-semibold my-2">Minhas Palestras</h2>
                <PalestrasList />
            </div>
        </div>
    );
};

export default HomePalestrante;
