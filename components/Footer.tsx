import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center text-sm mt-8">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Sistema de Recrutamento Cultural com IA. Todos os direitos reservados.</p>
        <p className="mt-2 text-gray-400">Powered by Google Gemini</p>
      </div>
    </footer>
  );
};