import React, { useState } from 'react';

const AvatarSelector = () => {
  // Estado para armazenar a semente do avatar
  const [avatarSeed, setAvatarSeed] = useState('user123');

  // Opções de estilos de avatar disponíveis
  const avatarStyles = [
    { id: 1, style: 'bottts', label: 'Bot Avatar' },
    { id: 2, style: 'identicon', label: 'Identicon Avatar' },
    // Adicione mais estilos conforme necessário
  ];

  // Função para gerar uma nova semente aleatória
  const generateRandomSeed = () => {
    return Math.random().toString(36).substring(7);
  };

  // Função para atualizar o avatar quando o usuário escolhe um estilo
  const handleAvatarChange = (style) => {
    setAvatarSeed(generateRandomSeed()); // Gera uma nova semente
  };

  return (
    <div>
      <h2>Escolha seu Avatar</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {avatarStyles.map((option) => (
          <div
            key={option.id}
            onClick={() => handleAvatarChange(option.style)}
            style={{ cursor: 'pointer', textAlign: 'center' }}
          >
            <img
              src={`https://api.dicebear.com/7.x/${option.style}/svg?seed=${avatarSeed}`}
              alt={option.label}
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
            <p>{option.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;