import React from 'react';
import { Users } from 'lucide-react';
import UserConnectionItem from './UserConnectionItem';

const ConnectionsSection = ({ connections, activeConnection, onConnectionClick }) => (
  <section className="mt-6">
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <Users size={20} /> Minhas Conexões
    </h3>
    <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
      {connections.length > 0 ? (
        connections.map((conn, index) => (
          <UserConnectionItem
            key={index}
            user={conn}
            isActive={activeConnection === index}
            onClick={() => onConnectionClick(index)}
            className="bg-white/10 dark:bg-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/70"
          />
        ))
      ) : (
        <p className="text-gray-200 dark:text-gray-300 text-sm">
          Nenhuma conexão ainda.
        </p>
      )}
    </div>
  </section>
);

export default ConnectionsSection;