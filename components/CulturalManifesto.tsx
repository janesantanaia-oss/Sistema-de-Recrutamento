import React, { useState } from 'react';
import { CulturalPillar, AntiFitTrait, JobRole } from '../types';
import { Button } from './Button';

interface CulturalManifestoProps {
  pillars: CulturalPillar[];
  antiFit: AntiFitTrait[];
  onConfirm: (name: string, role: string) => void;
}

export const CulturalManifesto: React.FC<CulturalManifestoProps> = ({ pillars, antiFit, onConfirm }) => {
  const [candidateName, setCandidateName] = useState<string>('');
  const [candidateRole, setCandidateRole] = useState<JobRole | ''>('');
  const [agreed, setAgreed] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string>('');
  const [roleError, setRoleError] = useState<string>('');

  const handleNext = () => {
    let valid = true;
    if (!candidateName.trim()) {
      setNameError('O nome do candidato é obrigatório.');
      valid = false;
    } else {
      setNameError('');
    }

    if (!candidateRole) {
      setRoleError('A vaga é obrigatória.');
      valid = false;
    } else {
      setRoleError('');
    }

    if (valid && agreed) {
      onConfirm(candidateName, candidateRole);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-4xl mx-auto mb-8">
      <h2 className="text-3xl font-extrabold text-red-700 mb-6 text-center">
        Bem-vindo(a) ao Nosso Processo de Recrutamento!
      </h2>
      <p className="text-gray-700 mb-8 text-lg leading-relaxed text-center">
        Estamos construindo uma equipe de alta performance no marketing digital. Antes de prosseguir, é fundamental que você compreenda e se alinhe com nossa cultura.
      </p>

      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Nossos Pilares Culturais:</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 list-inside">
          {pillars.map((pillar, index) => (
            <li key={index} className="flex items-start">
              <span className="text-red-600 mr-2 text-xl">&#10003;</span>
              <span className="font-medium">{pillar}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Anti-fit (O que não buscamos):</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 list-inside">
          {antiFit.map((trait, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gray-500 mr-2 text-xl">&#x2717;</span>
              <span className="font-medium">{trait}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-gray-700 italic mb-8 border-l-4 border-red-500 pl-4 py-2 bg-red-50 text-base">
        "Não contratamos promessas. Contratamos pessoas que já operam no nível da marca."
      </p>

      <div className="mb-6">
        <label htmlFor="candidateName" className="block text-gray-700 text-lg font-bold mb-2">
          Seu Nome Completo:
        </label>
        <input
          type="text"
          id="candidateName"
          className={`shadow appearance-none border rounded w-full py-3 px-4 bg-white text-gray-900 leading-tight focus:outline-none focus:shadow-outline ${nameError ? 'border-red-500' : ''}`}
          placeholder="Ex: Maria Silva"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          required
        />
        {nameError && <p className="text-red-500 text-xs italic mt-2">{nameError}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="candidateRole" className="block text-gray-700 text-lg font-bold mb-2">
          Vaga para a qual você está se candidatando:
        </label>
        <select
          id="candidateRole"
          className={`shadow appearance-none border rounded w-full py-3 px-4 bg-white text-gray-900 leading-tight focus:outline-none focus:shadow-outline ${roleError ? 'border-red-500' : ''}`}
          value={candidateRole}
          onChange={(e) => setCandidateRole(e.target.value as JobRole)}
          required
        >
          <option value="">Selecione uma vaga</option>
          {Object.values(JobRole).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {roleError && <p className="text-red-500 text-xs italic mt-2">{roleError}</p>}
      </div>

      <div className="mb-8 flex items-center">
        <input
          type="checkbox"
          id="agreeCheckbox"
          className="mr-2 h-5 w-5 text-red-600 rounded focus:ring-red-500"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <label htmlFor="agreeCheckbox" className="text-gray-800 text-base sm:text-lg">
          Eu li e compreendi o manifesto cultural e confirmo meu alinhamento.
        </label>
      </div>

      <div className="text-center">
        <Button onClick={handleNext} disabled={!agreed || !candidateName.trim() || !candidateRole} size="lg">
          Confirmar e Iniciar Avaliação
        </Button>
      </div>
    </div>
  );
};