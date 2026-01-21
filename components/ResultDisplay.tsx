import React from 'react';
import { EvaluationResult, ScoreClassification } from '../types';

interface ResultDisplayProps {
  result: EvaluationResult;
  candidateName: string;
  candidateRole: string;
}

const getClassificationColor = (classification: ScoreClassification) => {
  switch (classification) {
    case ScoreClassification.Failed:
      return 'bg-red-500';
    case ScoreClassification.TalentPool:
      return 'bg-yellow-500';
    case ScoreClassification.Interview:
      return 'bg-green-500';
    case ScoreClassification.HighPriority:
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, candidateName, candidateRole }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-4xl mx-auto mb-8">
      <h2 className="text-3xl font-extrabold text-red-700 mb-6 text-center">
        Resultado da Avaliação do Candidato
      </h2>
      <p className="text-gray-700 mb-8 text-lg leading-relaxed text-center">
        Aqui estão os resultados da avaliação de <span className="font-semibold">{candidateName}</span> para a vaga de <span className="font-semibold">{candidateRole}</span>.
      </p>

      <div className="mb-8 p-4 bg-gray-50 rounded-md shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Score Total:</h3>
        <div className="flex items-baseline justify-center sm:justify-start space-x-2">
          <span className="text-5xl font-extrabold text-red-600">{result.score}</span>
          <span className="text-2xl font-bold text-gray-600">/ 100</span>
        </div>
      </div>

      <div className={`mb-8 p-4 rounded-md text-white font-bold text-xl text-center ${getClassificationColor(result.classification)}`}>
        Classificação: {result.classification}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-gray-50 rounded-md shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Principais Forças:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {result.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-gray-50 rounded-md shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Red Flags Detectadas:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {result.redFlags.map((flag, index) => (
              <li key={index} className="text-red-700">{flag}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-8 p-4 bg-gray-50 rounded-md shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Resumo do Perfil:</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{result.summary}</p>
      </div>

      <div className="mb-8 p-4 bg-gray-50 rounded-md shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Riscos Culturais:</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{result.culturalRisks}</p>
      </div>

      <div className="p-4 bg-red-50 rounded-md shadow-sm border border-red-200">
        <h3 className="text-xl font-bold text-red-800 mb-3">Recomendação Final:</h3>
        <p className="text-red-700 leading-relaxed whitespace-pre-wrap">{result.recommendation}</p>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
        >
          Iniciar Nova Avaliação
        </button>
      </div>
    </div>
  );
};
