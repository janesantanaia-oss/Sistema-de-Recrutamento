import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold">
          <span className="hidden sm:inline">Sistema de Recrutamento Cultural com IA</span>
          <span className="sm:hidden">Recrutamento IA</span>
        </h1>
        <nav>
          {/* Future navigation items can go here */}
        </nav>
      </div>
    </header>
  );
};