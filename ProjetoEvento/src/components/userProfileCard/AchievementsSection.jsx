import React from 'react';
import { Medal } from 'lucide-react';
import Badge from './Badge';

const AchievementsSection = ({ badges }) => (
  <section className="mt-6">
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      <Medal size={20} /> Minhas Conquistas
    </h3>
    <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
      {badges.length > 0 ? (
        badges.map((badge, index) => (
          <Badge
            key={index}
            title={badge}
            icon={<Medal size={18} />}
            className="bg-white/10 dark:bg-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/70"
          />
        ))
      ) : (
        <p className="text-gray-200 dark:text-gray-300 text-sm">
          Nenhuma conquista ainda.
        </p>
      )}
    </div>
  </section>
);

export default AchievementsSection;