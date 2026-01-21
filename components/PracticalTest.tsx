import React, { useState } from 'react';
import { PracticalTestModuleQuestion, CandidateAnswers } from '../types';
import { Button } from './Button';

interface PracticalTestProps {
  practicalTestQuestions: PracticalTestModuleQuestion[];
  onSubmit: (answers: CandidateAnswers) => void;
  isLoading: boolean;
  error: string | null;
}

export const PracticalTest: React.FC<PracticalTestProps> = ({
  practicalTestQuestions,
  onSubmit,
  isLoading,
  error,
}) => {
  const [answers, setAnswers] = useState<CandidateAnswers>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (value.trim()) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    practicalTestQuestions.forEach((q) => {
      if (!answers[q.id] || answers[q.id].trim().length < 30) { // Require at least 30 characters for practical answers
        newErrors[q.id] = `Esta resposta é obrigatória e deve ter pelo menos 30 caracteres.`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(answers);
    } else {
      alert('Por favor, preencha todas as perguntas do teste prático com respostas detalhadas (mínimo de 30 caracteres por resposta).');
    }
  };

  const renderQuestion = (question: PracticalTestModuleQuestion) => (
    <div key={question.id} className="mb-6 bg-gray-50 p-4 rounded-md shadow-sm border border-gray-200">
      <label htmlFor={question.id} className="block text-gray-800 text-lg font-semibold mb-2">
        {question.question}
      </label>
      <textarea
        id={question.id}
        className={`shadow appearance-none border rounded w-full py-3 px-4 bg-white text-gray-900 leading-tight focus:outline-none focus:shadow-outline min-h-[120px] ${errors[question.id] ? 'border-red-500' : ''}`}
        placeholder={question.placeholder}
        value={answers[question.id] || ''}
        onChange={(e) => handleChange(question.id, e.target.value)}
        rows={5}
        required
      />
      {errors[question.id] && <p className="text-red-500 text-xs italic mt-2">{errors[question.id]}</p>}
      <p className="text-gray-500 text-xs mt-1">Mínimo de 30 caracteres.</p>
    </div>
  );

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-4xl mx-auto mb-8">
      <h2 className="text-3xl font-extrabold text-red-700 mb-6 text-center">Módulo de Teste Prático</h2>
      <p className="text-gray-700 mb-8 text-lg leading-relaxed text-center">
        Agora é a hora de mostrar suas habilidades na prática! Responda aos cenários abaixo como se estivesse em uma situação real de trabalho.
      </p>

      <form onSubmit={handleSubmit}>
        {practicalTestQuestions.map(renderQuestion)}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Erro:</strong>
            <span className="block sm:inline ml-2">{error}</span>
            <p className="text-sm mt-2">Por favor, tente novamente ou entre em contato com o suporte se o problema persistir.</p>
          </div>
        )}

        <div className="text-center mt-8">
          <Button type="submit" size="lg" isLoading={isLoading} disabled={isLoading}>
            Finalizar e Receber Avaliação
          </Button>
        </div>
      </form>
    </div>
  );
};