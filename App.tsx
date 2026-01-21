import React, { useState, useCallback } from 'react';
import { CulturalManifesto } from './components/CulturalManifesto';
import { Questionnaire } from './components/Questionnaire';
import { PracticalTest } from './components/PracticalTest';
import { ResultDisplay } from './components/ResultDisplay';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import {
  AppStage,
  CandidateAnswers,
  EvaluationResult,
  CulturalPillar,
  AntiFitTrait,
  DigitalMarketingModuleQuestion,
  CulturalFitModuleQuestion,
  PracticalTestModuleQuestion,
  ScoreClassification,
} from './types';
import {
  CULTURAL_PILLARS,
  ANTI_FIT_TRAITS,
  CULTURAL_FIT_QUESTIONS,
  DIGITAL_MARKETING_QUESTIONS,
  PRACTICAL_TEST_QUESTIONS,
  PROMPT_BASE,
  SCORING_WEIGHTS,
} from './constants';
import { evaluateCandidate } from './services/geminiService';

const App: React.FC = () => {
  const [appStage, setAppStage] = useState<AppStage>('manifesto');
  const [candidateName, setCandidateName] = useState<string>('');
  const [candidateRole, setCandidateRole] = useState<string>('');
  const [candidateAnswers, setCandidateAnswers] = useState<CandidateAnswers>({});
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleManifestoConfirm = (name: string, role: string) => {
    setCandidateName(name);
    setCandidateRole(role);
    setAppStage('questionnaire');
  };

  const handleQuestionnaireSubmit = (answers: CandidateAnswers) => {
    setCandidateAnswers((prev) => ({ ...prev, ...answers }));
    setAppStage('practical_test');
  };

  const handlePracticalTestSubmit = useCallback(async (answers: CandidateAnswers) => {
    setIsLoading(true);
    setError(null);
    const allAnswers = { ...candidateAnswers, ...answers };
    setCandidateAnswers(allAnswers);

    try {
      // Construct a detailed prompt for Gemini
      const fullPrompt = `
        ${PROMPT_BASE}

        ## Candidato: ${candidateName}
        ## Vaga Aplicada: ${candidateRole}

        ## Nossos Pilares Culturais:
        ${CULTURAL_PILLARS.map((p) => `- ${p}`).join('\n')}

        ## Traços Anti-fit (Desclassificadores):
        ${ANTI_FIT_TRAITS.map((a) => `- ${a}`).join('\n')}

        ## Respostas do Candidato:
        ### Módulo de Fit Cultural:
        ${CULTURAL_FIT_QUESTIONS.map((q: CulturalFitModuleQuestion) => {
          const answer = allAnswers[q.id] || 'N/A';
          return `- ${q.question}: "${answer}"`;
        }).join('\n')}

        ### Módulo de Mentalidade de Marketing Digital:
        ${DIGITAL_MARKETING_QUESTIONS.map((q: DigitalMarketingModuleQuestion) => {
          const answer = allAnswers[q.id] || 'N/A';
          return `- ${q.question}: "${answer}"`;
        }).join('\n')}

        ### Módulo de Teste Prático:
        ${PRACTICAL_TEST_QUESTIONS.map((q: PracticalTestModuleQuestion) => {
          const answer = allAnswers[q.id] || 'N/A';
          return `- ${q.question}: "${answer}"`;
        }).join('\n')}

        Com base nas respostas acima, avalie o candidato e gere um score detalhado, classificando-o conforme os critérios abaixo e apresentando os resultados em formato JSON.

        ## Sistema de Scoring:
        - Fit Cultural: 40%
        - Mentalidade de Marketing: 30%
        - Teste Prático: 20%
        - Comunicação Escrita: 10%

        ## Classificação Final:
        - 🔴 < 60 – Reprovado
        - 🟡 60–74 – Banco de Talentos
        - 🟢 75–84 – Entrevista
        - 🔵 85+ – Alta Prioridade

        O JSON de saída deve ter a seguinte estrutura:
        {
          "score": number, // Score total de 0-100
          "classification": "Reprovado" | "Banco de Talentos" | "Entrevista" | "Alta Prioridade",
          "strengths": string[], // Lista de pontos fortes
          "redFlags": string[], // Lista de "red flags" culturais e de performance
          "summary": string, // Resumo objetivo do perfil do candidato
          "culturalRisks": string, // Detalhamento dos riscos culturais
          "recommendation": string // Recomendação final (e.g., "Prosseguir para entrevista com foco em X", "Adicionar ao banco de talentos")
        }
      `;

      const result = await evaluateCandidate(fullPrompt, allAnswers);
      setEvaluationResult(result);
      setAppStage('results');
    } catch (err: any) {
      console.error('Error during AI evaluation:', err);
      setError(`Failed to evaluate candidate: ${err.message || 'Unknown error'}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidateAnswers, candidateName, candidateRole]);


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {appStage === 'manifesto' && (
          <CulturalManifesto
            onConfirm={handleManifestoConfirm}
            pillars={CULTURAL_PILLARS}
            antiFit={ANTI_FIT_TRAITS}
          />
        )}
        {appStage === 'questionnaire' && (
          <Questionnaire
            culturalFitQuestions={CULTURAL_FIT_QUESTIONS}
            digitalMarketingQuestions={DIGITAL_MARKETING_QUESTIONS}
            onSubmit={handleQuestionnaireSubmit}
          />
        )}
        {appStage === 'practical_test' && (
          <PracticalTest
            practicalTestQuestions={PRACTICAL_TEST_QUESTIONS}
            onSubmit={handlePracticalTestSubmit}
            isLoading={isLoading}
            error={error}
          />
        )}
        {appStage === 'results' && evaluationResult && (
          <ResultDisplay result={evaluationResult} candidateName={candidateName} candidateRole={candidateRole} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;