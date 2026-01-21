import React, { useState } from 'react';
import { CulturalFitModuleQuestion, DigitalMarketingModuleQuestion, CandidateAnswers } from '../types';
import { Button } from './Button';

interface QuestionnaireProps {
  culturalFitQuestions: CulturalFitModuleQuestion[];
  digitalMarketingQuestions: DigitalMarketingModuleQuestion[];
  onSubmit: (answers: CandidateAnswers) => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  culturalFitQuestions,
  digitalMarketingQuestions,
  onSubmit,
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
    [...culturalFitQuestions, ...digitalMarketingQuestions].forEach((q) => {
      if (!answers[q.id] || answers[q.id].trim().length < 50) { // Require at least 50 characters for open answers
        newErrors[q.id] = `Esta resposta é obrigatória e deve ter pelo menos 50 caracteres.`;
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
      alert('Por favor, preencha todas as perguntas com respostas detalhadas (mínimo de 50 caracteres por resposta).');
    }
  };

  const renderQuestion = (question: CulturalFitModuleQuestion | DigitalMarketingModuleQuestion) => (
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
      <p className="text-gray-500 text-xs mt-1">Mínimo de 50 caracteres.</p>
    </div>
  );

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-4xl mx-auto mb-8">
      <h2 className="text-3xl font-extrabold text-red-700 mb-6 text-center">Questionário Comportamental e de Mentalidade</h2>
      <p className="text-gray-700 mb-8 text-lg leading-relaxed text-center">
        Por favor, responda às seguintes perguntas de forma honesta e detalhada. Suas respostas nos ajudarão a entender seu alinhamento com nossa cultura e sua forma de pensar no marketing digital.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Módulo de Fit Cultural</h3>
          {culturalFitQuestions.map(renderQuestion)}
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Módulo de Mentalidade de Marketing Digital</h3>
          {digitalMarketingQuestions.map(renderQuestion)}
        </div>

        <div className="text-center">
          <Button type="submit" size="lg">
            Ir para Teste Prático
          </Button>
        </div>
      </form>
    </div>
  );
};