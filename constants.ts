import {
  CulturalPillar,
  AntiFitTrait,
  CulturalFitModuleQuestion,
  DigitalMarketingModuleQuestion,
  PracticalTestModuleQuestion,
} from './types';

export const PROMPT_BASE: string = `Você é um avaliador de recrutamento especializado em marketing digital de alta performance. Avalie as respostas do candidato considerando cultura de marca, orientação a métricas, mentalidade de dono, velocidade de aprendizado e consistência. Gere score, justificativa objetiva e possíveis riscos. Seja direto, técnico e sem viés emocional. O candidato deve ser avaliado não apenas por habilidades técnicas, mas principalmente por alinhamento cultural, inspirado na cultura da Coca-Cola (marca, consistência, execução e escala), adaptada ao marketing digital orientado a dados.`;

export const CULTURAL_PILLARS: CulturalPillar[] = [
  CulturalPillar.BrandMindset,
  CulturalPillar.PerformanceObsessed,
  CulturalPillar.ExecutableCreativity,
  CulturalPillar.SpeedAndLearning,
  CulturalPillar.Ownership,
  CulturalPillar.Consistency,
];

export const ANTI_FIT_TRAITS: AntiFitTrait[] = [
  AntiFitTrait.MetricsDisregard,
  AntiFitTrait.ProfessionalVictimhood,
  AntiFitTrait.CreativeEgo,
  AntiFitTrait.LowAdaptability,
  AntiFitTrait.ConstantValidationDependency,
];

export const CULTURAL_FIT_QUESTIONS: CulturalFitModuleQuestion[] = [
  {
    id: 'cultural_1',
    question: 'Descreva uma situação em que você precisou se adaptar rapidamente a uma nova ferramenta ou processo de trabalho. Como você lidou com isso e qual foi o resultado?',
    type: 'textarea',
    placeholder: 'Sua resposta aqui...',
    module: 'cultural-fit',
  },
  {
    id: 'cultural_2',
    question: 'Conte sobre um projeto em que você assumiu total responsabilidade, do início ao fim, mesmo quando encontrou obstáculos inesperados.',
    type: 'textarea',
    placeholder: 'Sua resposta aqui...',
    module: 'cultural-fit',
  },
  {
    id: 'cultural_3',
    question: 'Como você garante a consistência e a qualidade em suas entregas, mesmo em um ritmo de trabalho acelerado?',
    type: 'textarea',
    placeholder: 'Sua resposta aqui...',
    module: 'cultural-fit',
  },
  {
    id: 'cultural_4',
    question: 'Qual a sua relação com feedback negativo? Descreva uma situação em que você o recebeu e como o utilizou para melhorar.',
    type: 'textarea',
    placeholder: 'Sua resposta aqui...',
    module: 'cultural-fit',
  },
];

export const DIGITAL_MARKETING_QUESTIONS: DigitalMarketingModuleQuestion[] = [
  {
    id: 'marketing_1',
    question: 'Você está gerenciando uma campanha de anúncios pagos e o CPC está muito alto. Quais seriam os primeiros 3 passos para diagnosticar e otimizar essa situação?',
    type: 'textarea',
    placeholder: 'Sua resposta aqui...',
    module: 'digital-marketing',
  },
  {
    id: 'marketing_2',
    question: 'Como você definiria "sucesso" em uma campanha de marketing de conteúdo para uma nova marca de café, considerando que o principal objetivo é construir reconhecimento de marca e engajamento?',
    type: 'textarea',
    placeholder: 'Sua resposta aqui...',
    module: 'digital-marketing',
  },
  {
    id: 'marketing_3',
    question: 'Descreva uma métrica de marketing digital que você considera subestimada e por que ela é importante para a tomada de decisões estratégicas.',
    type: 'textarea',
    placeholder: 'Sua resposta aqui...',
    module: 'digital-marketing',
  },
];

export const PRACTICAL_TEST_QUESTIONS: PracticalTestModuleQuestion[] = [
  {
    id: 'practical_1',
    question: 'Crie uma headline de anúncio para um produto fictício: um smartwatch que monitora a qualidade do sono e oferece sugestões personalizadas para melhoria.',
    type: 'textarea',
    placeholder: 'Ex: "Durma Melhor, Viva Mais: Seu Guia Personalizado para o Sono Perfeito."',
    module: 'practical-test',
  },
  {
    id: 'practical_2',
    question: 'Anexe ou descreva um criativo (imagem/vídeo) que você considera altamente eficaz em capturar a atenção do público-alvo de um produto ou serviço específico. Justifique sua escolha.',
    type: 'textarea',
    placeholder: 'Sua descrição ou link aqui...',
    module: 'practical-test',
  },
  {
    id: 'practical_3',
    question: 'Você identificou que 80% do tráfego do blog vem de apenas 3 artigos, mas eles não convertem. Que tipo de ação você priorizaria para resolver esse problema e por quê?',
    type: 'textarea',
    placeholder: 'Sua resposta aqui...',
    module: 'practical-test',
  },
];

export const SCORING_WEIGHTS = {
  culturalFit: 0.40,
  marketingMindset: 0.30,
  practicalTest: 0.20,
  writtenCommunication: 0.10,
};
